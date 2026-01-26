import { Request, Response, NextFunction } from "express";

type RateLimitEntry = {
  failCount: number;
  firstFailAt: number;
  lastFailAt: number;
  nextAllowedAt: number;
  lockUntil: number;
};

const store = new Map<string, RateLimitEntry>();

const WINDOW_MS = 5 * 60 * 1000;
const MAX_FAILS = 5;
const LOCK_MS = 10 * 60 * 1000;
const DELAY_STEPS_MS = [0, 1000, 3000, 10000, 30000];

const getClientIp = (req: Request) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }
  return req.ip || "unknown";
};

export const getLoginRateLimitKey = (req: Request) => {
  const ip = getClientIp(req);
  const usernameRaw =
    typeof req.body?.username === "string" ? req.body.username : "";
  const username = usernameRaw.trim().toLowerCase();
  return username ? `${ip}:${username}` : ip;
};

const resetIfExpired = (entry: RateLimitEntry, now: number) => {
  if (now - entry.firstFailAt > WINDOW_MS) {
    entry.failCount = 0;
    entry.firstFailAt = now;
    entry.nextAllowedAt = 0;
    entry.lockUntil = 0;
  }
};

const cleanupIfStale = (key: string, entry: RateLimitEntry, now: number) => {
  if (entry.failCount === 0 && now - entry.lastFailAt > WINDOW_MS) {
    store.delete(key);
  }
};

export const loginRateLimit = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const key = getLoginRateLimitKey(req);
  const entry = store.get(key);
  const now = Date.now();

  if (entry) {
    resetIfExpired(entry, now);

    if (entry.lockUntil && now < entry.lockUntil) {
      const waitMs = entry.lockUntil - now;
      return res.status(429).json({
        success: false,
        message: "Terlalu banyak percobaan login. Coba lagi nanti.",
        retryAfterSeconds: Math.ceil(waitMs / 1000),
      });
    }

    if (entry.nextAllowedAt && now < entry.nextAllowedAt) {
      const waitMs = entry.nextAllowedAt - now;
      return res.status(429).json({
        success: false,
        message: "Coba lagi setelah beberapa saat.",
        retryAfterSeconds: Math.ceil(waitMs / 1000),
      });
    }

    cleanupIfStale(key, entry, now);
  }

  next();
};

export const recordLoginFailure = (key: string) => {
  const now = Date.now();
  const entry =
    store.get(key) ??
    ({
      failCount: 0,
      firstFailAt: now,
      lastFailAt: now,
      nextAllowedAt: 0,
      lockUntil: 0,
    } satisfies RateLimitEntry);

  resetIfExpired(entry, now);

  entry.failCount += 1;
  entry.lastFailAt = now;

  const delayIndex = Math.min(entry.failCount, DELAY_STEPS_MS.length - 1);
  entry.nextAllowedAt = now + DELAY_STEPS_MS[delayIndex];

  if (entry.failCount >= MAX_FAILS) {
    entry.lockUntil = now + LOCK_MS;
  }

  store.set(key, entry);
};

export const recordLoginSuccess = (key: string) => {
  const entry = store.get(key);
  if (!entry) return;

  entry.failCount = 0;
  entry.firstFailAt = Date.now();
  entry.lastFailAt = entry.firstFailAt;
  entry.nextAllowedAt = 0;
  entry.lockUntil = 0;

  cleanupIfStale(key, entry, entry.lastFailAt);
};
