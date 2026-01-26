import express from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "Token tidak valid" });

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  const secret = process.env.JWT_SECRET;
  if (!secret)
    return res.status(500).json({ message: "Internal Server Error" });

  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) return res.status(401).json({ message: "Token tidak valid" });
    req.user = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
      fakultas_id: decoded.fakultas_id ?? decoded.fakultasId ?? null,
      unit_universitas_id:
        decoded.unit_universitas_id ?? decoded.unitUniversitasId ?? null,
    } as any;
    next();
  });
};
