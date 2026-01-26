import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { JenisKegiatan } from "../generated/prisma";
import { StatusPeminjaman } from "../generated/prisma";

const getUserScopeFilter = (req: Request) => {
  const role = req.user?.role;
  if (role === "SUPERADMIN" || role === "ADMIN") {
    return {};
  }

  const fakultasId = req.user?.fakultas_id ?? null;
  const unitUniversitasId = req.user?.unit_universitas_id ?? null;

  if (!fakultasId && !unitUniversitasId) {
    return null;
  }

  const orFilters = [];
  if (fakultasId) {
    orFilters.push({ fakultas_id: fakultasId });
  }
  if (unitUniversitasId) {
    orFilters.push({ unit_universitas_id: unitUniversitasId });
  }

  return { OR: orFilters };
};

export const AvailableRoomsController = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { waktu_mulai, waktu_selesai, fakultas_id } = req.query;

    if (!waktu_mulai || !waktu_selesai) {
      return res.status(400).json({
        success: false,
        message: "Waktu mulai dan waktu selesai wajib diisi.",
      });
    }

    const waktuMulai = new Date(waktu_mulai as string);
    const waktuSelesai = new Date(waktu_selesai as string);

    if (
      Number.isNaN(waktuMulai.getTime()) ||
      Number.isNaN(waktuSelesai.getTime())
    ) {
      return res.status(400).json({
        success: false,
        message: "Format waktu tidak valid.",
      });
    }

    const conflictingRoomIds = (
      await prisma.peminjaman.findMany({
        where: {
          status_peminjaman: {
            in: ["DIPROSES", "DITERIMA"],
          },
          waktu_mulai: {
            lt: waktuSelesai,
          },
          waktu_selesai: {
            gt: waktuMulai,
          },
        },
        select: {
          id_ruangan: true,
        },
      })
    ).map((p) => p.id_ruangan);

    const uniqueConflictingRoomIds = [...new Set(conflictingRoomIds)];

    const scopeFilter = getUserScopeFilter(req);
    if (!scopeFilter) {
      return res.status(403).json({
        success: false,
        message: "Akses ruangan tidak diizinkan.",
      });
    }

    const fakultasFilter =
      (req.user?.role === "SUPERADMIN" || req.user?.role === "ADMIN") &&
      fakultas_id &&
      !Number.isNaN(Number(fakultas_id))
        ? { fakultas_id: Number(fakultas_id) }
        : {};

    const availableRooms = await prisma.ruangan.findMany({
      where: {
        id_ruangan: {
          notIn: uniqueConflictingRoomIds,
        },
        ...scopeFilter,
        ...fakultasFilter,
      },
    });

    const availableRoomIds = availableRooms.map((room) => room.id_ruangan);
    let peminjamanCountMap = new Map<number, number>();

    if (availableRoomIds.length > 0) {
      const peminjamanCounts = await prisma.peminjaman.groupBy({
        by: ["id_ruangan"],
        where: {
          id_ruangan: { in: availableRoomIds },
          status_peminjaman: {
            in: [StatusPeminjaman.DIPROSES, StatusPeminjaman.DITERIMA],
          },
        },
        _count: { _all: true },
      });

      peminjamanCountMap = new Map(
        peminjamanCounts.map((item) => [item.id_ruangan, item._count._all]),
      );
    }

    const availableRoomsWithCounts = availableRooms.map((room) => ({
      ...room,
      antrian_peminjaman: peminjamanCountMap.get(room.id_ruangan) ?? 0,
    }));

    return res.json({ success: true, ruangan: availableRoomsWithCounts });
  } catch (err) {
    console.error("Error fetching ruangan tersedia:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const RuangController = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const scopeFilter = getUserScopeFilter(req);
    if (!scopeFilter) {
      return res.status(403).json({
        success: false,
        message: "Akses ruangan tidak diizinkan.",
      });
    }

    const ruangan = await prisma.ruangan.findMany({
      where: scopeFilter,
    });

    const ruanganIds = ruangan.map((room) => room.id_ruangan);
    let peminjamanCountMap = new Map<number, number>();

    if (ruanganIds.length > 0) {
      const peminjamanCounts = await prisma.peminjaman.groupBy({
        by: ["id_ruangan"],
        where: {
          id_ruangan: { in: ruanganIds },
          status_peminjaman: {
            in: [StatusPeminjaman.DIPROSES, StatusPeminjaman.DITERIMA],
          },
        },
        _count: { _all: true },
      });

      peminjamanCountMap = new Map(
        peminjamanCounts.map((item) => [item.id_ruangan, item._count._all]),
      );
    }

    const ruanganWithCounts = ruangan.map((room) => ({
      ...room,
      antrian_peminjaman: peminjamanCountMap.get(room.id_ruangan) ?? 0,
    }));

    return res.json({
      success: true,
      ruangan: ruanganWithCounts,
    });
  } catch (err) {
    console.error("Error fetching ruang data:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const RuanganDetailController = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const ruanganId = Number(req.params.id_ruangan);
    if (Number.isNaN(ruanganId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ruangan id" });
    }

    const scopeFilter = getUserScopeFilter(req);
    if (!scopeFilter) {
      return res.status(403).json({
        success: false,
        message: "Akses ruangan tidak diizinkan.",
      });
    }

    const ruangan = await prisma.ruangan.findFirst({
      where: {
        id_ruangan: ruanganId,
        ...scopeFilter,
      },
    });

    if (!ruangan) {
      return res
        .status(404)
        .json({ success: false, message: "Ruangan not found" });
    }

    return res.json({ success: true, ruangan });
  } catch (err) {
    console.error("Error fetching ruangan detail:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const FasilitasController = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const scopeFilter = getUserScopeFilter(req);
    if (!scopeFilter) {
      return res.status(403).json({
        success: false,
        message: "Akses fasilitas tidak diizinkan.",
      });
    }

    const fasilitas = await prisma.fasilitas.findMany({
      where: {
        ruanganfasilitas: {
          some: {
            ruangan: scopeFilter,
          },
        },
      },
    });

    if (!fasilitas) {
      return res
        .status(404)
        .json({ success: false, message: "Fasilitas Not Found" });
    }

    return res.json({
      success: true,
      fasilitas: fasilitas,
    });
  } catch (err) {
    console.log("Error fetching fasilitas data:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const RuanganFasilitasController = async (
  req: Request,
  res: Response,
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const scopeFilter = getUserScopeFilter(req);
    if (!scopeFilter) {
      return res.status(403).json({
        success: false,
        message: "Akses ruangan tidak diizinkan.",
      });
    }

    const ruanganFasilitas = await prisma.ruanganfasilitas.findMany({
      where: {
        ruangan: {
          ...scopeFilter,
        },
      },
      include: {
        ruangan: {
          select: {
            id_ruangan: true,
            nama_ruangan: true,
            gedung: true,
            lantai: true,
            kapasitas: true,
          },
        },
        fasilitas: {
          select: {
            id_fasilitas: true,
            nama_fasilitas: true,
          },
        },
      },
    });

    return res.json({ success: true, ruanganFasilitas });
  } catch (err) {
    console.error("Error fetching fasilitas data:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const RuanganReservationController = async (
  req: Request,
  res: Response,
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const {
      id_ruangan,
      waktu_mulai,
      waktu_selesai,
      nama_kegiatan,
      jenis_kegiatan,
      nomor_telepon,
      jumlah_peserta,
      dosen_penanggung_jawab,
      path_file_surat,
      mata_kuliah,
      kebutuhan_alat,
      keterangan_tambahan,
    } = req.body ?? {};

    const ruanganId = Number(id_ruangan);
    if (!ruanganId || Number.isNaN(ruanganId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ruangan id" });
    }

    if (!waktu_mulai || !waktu_selesai) {
      return res.status(400).json({
        success: false,
        message: "Waktu mulai dan waktu selesai wajib diisi.",
      });
    }

    const waktuMulai = new Date(waktu_mulai);
    const waktuSelesai = new Date(waktu_selesai);
    if (
      Number.isNaN(waktuMulai.getTime()) ||
      Number.isNaN(waktuSelesai.getTime())
    ) {
      return res.status(400).json({
        success: false,
        message: "Format waktu tidak valid.",
      });
    }

    if (waktuMulai >= waktuSelesai) {
      return res.status(400).json({
        success: false,
        message: "Waktu selesai harus lebih besar dari waktu mulai.",
      });
    }

    const wibOffsetMinutes = 7 * 60;
    const minutesInDay = 24 * 60;
    const toWibMinutes = (value: Date) => {
      const utcMinutes = value.getUTCHours() * 60 + value.getUTCMinutes();
      const totalMinutes = utcMinutes + wibOffsetMinutes;
      return ((totalMinutes % minutesInDay) + minutesInDay) % minutesInDay;
    };
    const minTimeMinutes = 7 * 60;
    const maxStartMinutes = 17 * 60 + 20;
    const maxEndMinutes = 18 * 60;
    const waktuMulaiMinutes = toWibMinutes(waktuMulai);
    const waktuSelesaiMinutes = toWibMinutes(waktuSelesai);

    if (waktuMulaiMinutes < minTimeMinutes) {
      return res.status(400).json({
        success: false,
        message: "Waktu mulai harus antara 07:00 sampai 17:20 WIB.",
      });
    }

    if (waktuMulaiMinutes > maxStartMinutes) {
      return res.status(400).json({
        success: false,
        message: "Waktu mulai harus antara 07:00 sampai 17:20 WIB.",
      });
    }

    if (waktuSelesaiMinutes > maxEndMinutes) {
      return res.status(400).json({
        success: false,
        message: "Waktu selesai harus antara 07:00 sampai 18:00 WIB.",
      });
    }

    if (waktuSelesaiMinutes - waktuMulaiMinutes < 40) {
      return res.status(400).json({
        success: false,
        message: "Durasi peminjaman minimal 40 menit.",
      });
    }

    if (!nama_kegiatan || !jenis_kegiatan) {
      return res.status(400).json({
        success: false,
        message: "Nama kegiatan dan jenis kegiatan wajib diisi.",
      });
    }

    const nomorTelepon = Number(nomor_telepon);
    if (!nomorTelepon || Number.isNaN(nomorTelepon)) {
      return res.status(400).json({
        success: false,
        message: "Nomor telepon wajib diisi dan harus berupa angka.",
      });
    }

    const jumlahPeserta = Number(jumlah_peserta);
    if (!jumlahPeserta || Number.isNaN(jumlahPeserta)) {
      return res.status(400).json({
        success: false,
        message: "Jumlah peserta wajib diisi dan harus berupa angka.",
      });
    }

    const normalizedJenisKegiatan = String(jenis_kegiatan).toUpperCase();
    if (
      !Object.values(JenisKegiatan).includes(
        normalizedJenisKegiatan as JenisKegiatan,
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Jenis kegiatan tidak valid.",
      });
    }

    const scopeFilter = getUserScopeFilter(req);
    if (!scopeFilter) {
      return res.status(403).json({
        success: false,
        message: "Akses ruangan tidak diizinkan.",
      });
    }

    const ruangan = await prisma.ruangan.findFirst({
      where: {
        id_ruangan: ruanganId,
        ...scopeFilter,
      },
      select: {
        id_ruangan: true,
      },
    });

    if (!ruangan) {
      return res
        .status(404)
        .json({ success: false, message: "Ruangan not found" });
    }

    const konflikPeminjaman = await prisma.peminjaman.findFirst({
      where: {
        id_ruangan: ruanganId,
        status_peminjaman: {
          not: "DITOLAK",
        },
        AND: [
          {
            waktu_mulai: {
              lt: waktuSelesai,
            },
          },
          {
            waktu_selesai: {
              gt: waktuMulai,
            },
          },
        ],
      },
      select: {
        id_peminjaman: true,
      },
    });

    if (konflikPeminjaman) {
      return res.status(409).json({
        success: false,
        message: "Ruangan sedang dipinjam.",
      });
    }

    const normalizedStatusPeminjaman = String(
      StatusPeminjaman.DIPROSES,
    ).toUpperCase();

    const peminjaman = await prisma.peminjaman.create({
      data: {
        id_user: req.user.id,
        id_ruangan: ruanganId,
        nama_kegiatan: String(nama_kegiatan),
        jenis_kegiatan: normalizedJenisKegiatan as JenisKegiatan,
        nomor_telepon: String(nomorTelepon),
        jumlah_peserta: jumlahPeserta,
        dosen_penanggung_jawab: dosen_penanggung_jawab ?? null,
        path_file_surat: path_file_surat ?? null,
        mata_kuliah: mata_kuliah ?? null,
        keterangan_tambahan: keterangan_tambahan ?? null,
        kebutuhan_alat: kebutuhan_alat ?? null,
        waktu_mulai: waktuMulai,
        waktu_selesai: waktuSelesai,
        status_peminjaman: normalizedStatusPeminjaman as StatusPeminjaman,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Peminjaman berhasil dibuat.",
      data: peminjaman,
    });
  } catch (err) {
    console.log("Error ", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const PeminjamanController = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id)
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });

    const peminjaman = await prisma.peminjaman.findMany({
      where: {
        id_user: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id_peminjaman: true,
        status_peminjaman: true,
        waktu_mulai: true,
        waktu_selesai: true,
        createdAt: true,
        ruangan: {
          select: {
            id_ruangan: true,
            nama_ruangan: true,
            gedung: true,
            lantai: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Peminjaman berhasil ditemukan.",
      data: peminjaman,
    });
  } catch (err) {
    console.log("Error ", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const CancelPeminjamanController = async (
  req: Request,
  res: Response,
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const peminjamanId = Number(req.params.id_peminjaman);
    if (!peminjamanId || Number.isNaN(peminjamanId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid peminjaman id",
      });
    }

    const peminjaman = await prisma.peminjaman.findFirst({
      where: {
        id_peminjaman: peminjamanId,
        id_user: req.user.id,
      },
      select: {
        id_peminjaman: true,
        status_peminjaman: true,
      },
    });

    if (!peminjaman) {
      return res.status(404).json({
        success: false,
        message: "Peminjaman not found",
      });
    }

    if (
      peminjaman.status_peminjaman === StatusPeminjaman.DITOLAK ||
      peminjaman.status_peminjaman === StatusPeminjaman.SELESAI ||
      peminjaman.status_peminjaman === StatusPeminjaman.DIBATALKAN
    ) {
      return res.status(400).json({
        success: false,
        message: "Peminjaman tidak dapat dibatalkan.",
      });
    }

    const updated = await prisma.peminjaman.update({
      where: {
        id_peminjaman: peminjamanId,
      },
      data: {
        status_peminjaman: StatusPeminjaman.DIBATALKAN,
      },
      select: {
        id_peminjaman: true,
        status_peminjaman: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Peminjaman berhasil dibatalkan.",
      data: updated,
    });
  } catch (err) {
    console.log("Error ", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getPeminjamanByRuangan = async (req: Request, res: Response) => {
  try {
    const ruanganId = Number(req.params.id_ruangan);
    if (!ruanganId || Number.isNaN(ruanganId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ruangan id",
      });
    }

    const peminjaman = await prisma.peminjaman.findMany({
      where: {
        id_ruangan: ruanganId,
        status_peminjaman: {
          in: [StatusPeminjaman.DITERIMA, StatusPeminjaman.DIPROSES],
        },
      },
      orderBy: {
        waktu_mulai: "desc",
      },
      select: {
        id_peminjaman: true,
        waktu_mulai: true,
        waktu_selesai: true,
        status_peminjaman: true,
        user: {
          select: {
            nama_lengkap: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Peminjaman berhasil ditemukan.",
      data: peminjaman,
    });
  } catch (err) {
    console.log("Error ", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
