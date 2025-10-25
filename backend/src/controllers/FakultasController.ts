import { Request, Response } from "express"
import prisma from "../../prisma/client"

export const FakultasController = async (req:Request, res:Response ) => {
    try{
        if(!req.user?.id){
            return res.status(401).json({ success: false, message: 'Unauthorized' })
        }
        
        const fakultas = await prisma.fakultas.findMany();

        return res.json({
            success: true,
            fakultas: fakultas,
        })
        
    } catch(err) {
        console.error('Error fetching ruang data:', err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}