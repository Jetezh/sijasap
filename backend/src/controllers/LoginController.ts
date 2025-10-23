import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { loginSchema } from "../utils/validators/auth";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as z from 'zod'

export const loginController = async (req: Request, res: Response) => {
    const parsed = loginSchema.safeParse(req.body);

    if(!parsed.success) {
        return res.status(401).json({
            success: false,
            message: "Validasi gagal",
            errors: z.flattenError(parsed.error).fieldErrors
        })
    } 

    try {
        const { username, password } = parsed.data;
    
        const user = await prisma.user.findFirst({
            where: { username },
            include: { fakultas: true }
        })
    
        if(!user) return res.status(401).json({success: false, message: 'Username tidak ditemukan'});
    
        const valid = await bcrypt.compare(password, user.password);
    
        if(!valid) return res.status(401).json({success: false, message: 'Password salah'});
    
        const token = jwt.sign({
            id: user.id_user, 
            role: user.role, 
            fakultasId: user.fakultas_id
        }, process.env.JWT_SECRET as string, { expiresIn: "1h"});
    
        return res.json({
            success: true,
            message: 'Login Berhasil',
            token,
            user: {
                id: user.id_user,
                username: user.username,
                role: user.role
            }
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
