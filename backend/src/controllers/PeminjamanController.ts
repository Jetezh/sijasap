import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { JenisKegiatan } from "../generated/prisma";
import { StatusPeminjaman } from "../generated/prisma";

export const getPeminjamanData = async (req: Request, res: Response) => {
    if(!req.user?.id)
}