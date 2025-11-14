import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const ProfileController = async (req: Request, res: Response) => {
    try {
        if(!req.user?.id) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const user = await prisma.user.findUnique({
            where: { id_user: req.user.id },
            select: {
                id_user: true,
                username: true,
                role: true,
                nama_lengkap: true,
                fakultas_id: true,
                email_upnvj: true,
                unit_universitas_id: true,
                fakultas: {
                    select: {
                        nama_fakultas: true
                    }
                }
            }
        });

        if(!user) return res.status(404).json({ success: false, message: 'User not found' });

        return res.json({
            success: true,
            user: user
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}