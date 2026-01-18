import prisma from "../../prisma/client";
import { StatusPeminjaman } from "../generated/prisma";

const ONE_HOUR_MS = 60 * 60 * 1000;
const EXPIRY_WINDOW_MS = 24 * ONE_HOUR_MS;
const JOB_INTERVAL_MS = 5 * 60 * 1000;

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

const completeFinishedPeminjaman = async () => {
  const now = new Date();
  return prisma.peminjaman.updateMany({
    where: {
      status_peminjaman: StatusPeminjaman.DITERIMA,
      waktu_selesai: {
        lte: now,
      },
    },
    data: {
      status_peminjaman: StatusPeminjaman.SELESAI,
    },
  });
};

export const startPeminjamanExpiryJob = () => {
  const run = async () => {
    try {
      const [expiredResult, completedResult] = await Promise.all([
        rejectExpiredPeminjaman(),
        completeFinishedPeminjaman(),
      ]);
      if (expiredResult.count > 0) {
        console.log(
          `[PeminjamanExpiry] Auto-rejected ${expiredResult.count} peminjaman(s).`,
        );
      }
      if (completedResult.count > 0) {
        console.log(
          `[PeminjamanExpiry] Auto-completed ${completedResult.count} peminjaman(s).`,
        );
      }
    } catch (error) {
      console.error(
        "[PeminjamanExpiry] Failed to update peminjaman status:",
        error,
      );
    }
  };

  void run();
  setInterval(run, JOB_INTERVAL_MS);
};
