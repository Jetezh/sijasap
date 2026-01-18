import prisma from "../../prisma/client";
import { StatusPeminjaman } from "../generated/prisma";

const ONE_HOUR_MS = 60 * 60 * 1000;
const EXPIRY_WINDOW_MS = 24 * ONE_HOUR_MS;
const JOB_INTERVAL_MS = 15 * 60 * 1000;

const rejectExpiredPeminjaman = async () => {
  const cutoff = new Date(Date.now() - EXPIRY_WINDOW_MS);
  return prisma.peminjaman.updateMany({
    where: {
      status_peminjaman: StatusPeminjaman.DIPROSES,
      createdAt: {
        lt: cutoff,
      },
    },
    data: {
      status_peminjaman: StatusPeminjaman.DITOLAK,
    },
  });
};

export const startPeminjamanExpiryJob = () => {
  const run = async () => {
    try {
      const result = await rejectExpiredPeminjaman();
      if (result.count > 0) {
        console.log(
          `[PeminjamanExpiry] Auto-rejected ${result.count} peminjaman(s).`,
        );
      }
    } catch (error) {
      console.error(
        "[PeminjamanExpiry] Failed to auto-reject peminjaman:",
        error,
      );
    }
  };

  void run();
  setInterval(run, JOB_INTERVAL_MS);
};
