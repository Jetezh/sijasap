import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { JenisKegiatan } from "../generated/prisma";
import { StatusPeminjaman } from "../generated/prisma";

export const RuangController = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const ruangan = await prisma.ruangan.findMany({
      where: { fakultas_id: req.user?.fakultas_id },
    });

    return res.json({
      success: true,
      ruangan: ruangan,
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

    const fakultasId = req.user.fakultas_id ?? null;
    const unitUniversitasId = req.user.unit_universitas_id ?? null;

    const ruangan = await prisma.ruangan.findFirst({
      where: {
        id_ruangan: ruanganId,
        ...(fakultasId && { fakultas_id: fakultasId }),
        ...(unitUniversitasId && { unit_universitas_id: unitUniversitasId }),
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

    const fasilitas = await prisma.fasilitas.findMany();

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

    const fakultasId = req.user.fakultas_id ?? null;
    const unitUniversitasId = req.user.unit_universitas_id ?? null;

    const ruanganFasilitas = await prisma.ruanganfasilitas.findMany({
      where: {
        ruangan: {
          ...(fakultasId && { fakultas_id: fakultasId }),
          ...(unitUniversitasId && { unit_universitas_id: unitUniversitasId }),
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
    const maxTimeMinutes = 17 * 60 + 20;
    const waktuMulaiMinutes = toWibMinutes(waktuMulai);
    const waktuSelesaiMinutes = toWibMinutes(waktuSelesai);

    if (waktuMulaiMinutes < minTimeMinutes) {
      return res.status(400).json({
        success: false,
        message: "Waktu mulai harus antara 07:00 sampai 17:20 WIB.",
      });
    }

    if (waktuSelesaiMinutes > maxTimeMinutes) {
      return res.status(400).json({
        success: false,
        message: "Waktu selesai harus antara 07:00 sampai 17:20 WIB.",
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

    const fakultasId = req.user.fakultas_id ?? null;
    const unitUniversitasId = req.user.unit_universitas_id ?? null;

    const ruangan = await prisma.ruangan.findFirst({
      where: {
        id_ruangan: ruanganId,
        ...(fakultasId && { fakultas_id: fakultasId }),
        ...(unitUniversitasId && { unit_universitas_id: unitUniversitasId }),
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
