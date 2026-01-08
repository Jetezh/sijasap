import { Request, Response } from "express";
import prisma from "../../prisma/client";

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
    const unitUniversitasId = req.user.unit_Universitas_Id ?? null;

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
    const unitUniversitasId = req.user.unit_Universitas_Id ?? null;

    const ruanganFasilitas = await prisma.ruanganFasilitas.findMany({
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

    if (!ruanganFasilitas.length) {
      return res.status(404).json({
        success: false,
        message: "Data Ruangan/Fasilitas tidak ditemukan",
      });
    }

    return res.json({ success: true, ruanganFasilitas });
  } catch (err) {
    console.error("Error fetching fasilitas data:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
