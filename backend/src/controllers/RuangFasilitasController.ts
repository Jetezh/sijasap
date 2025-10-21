import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const RuangController = async (req: Request, res:Response) => {
    try {

        if(!req.user?.id) {
            return res.status(401).json({ success: false, message: 'Unauthorized' })
        }

        const ruang = await prisma.ruangan.count({
            where: { fakultas_id:  }
        })
    }
}