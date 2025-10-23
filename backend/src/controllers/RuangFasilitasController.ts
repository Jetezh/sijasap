import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const TotalRuangController = async (req: Request, res:Response) => {
    try {
        if(!req.user?.id) {
            return res.status(401).json({ success: false, message: 'Unauthorized' })
        }

        const totalRuang = await prisma.ruangan.count({
            where: { fakultas_id: req.user?.fakultas_id}
        })

        return res.json({
            success: true,
            total_ruangan: totalRuang
        })
    } catch(err) {
        console.error('Error fetching ruang data:', err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

export const FasilitasController = async (req: Request, res:Response) => {
    try {
        if(!req.user?.id) {
            return res.status(401).json({ success: false, message: 'Unauthorized' })
        }

        const fasilitas = await prisma.fasilitas.findMany()

        if(!fasilitas) {
            return res.status(404).json({ success: false, message: 'Fasilitas Not Found' });
        }

        return res.json({
            success: true,
            data: fasilitas,
        })
    } catch(err) {
        console.log('Error fetching fasilitas data:', err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}