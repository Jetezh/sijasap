import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { loginSchema } from "../utils/validators/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as z from "zod";
import {
  getLoginRateLimitKey,
  recordLoginFailure,
  recordLoginSuccess,
} from "../middlewares/loginRateLimit";

export const loginController = async (req: Request, res: Response) => {
  const rateLimitKey = getLoginRateLimitKey(req);
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    recordLoginFailure(rateLimitKey);
    return res.status(401).json({
      success: false,
      message: "Validasi gagal",
      errors: z.flattenError(parsed.error).fieldErrors,
    });
  }

  try {
    const { username, password } = parsed.data;

    const user = await prisma.user.findFirst({
      where: { username },
      include: { fakultas: true },
    });

    if (!user) {
      recordLoginFailure(rateLimitKey);
      return res
        .status(401)
        .json({ success: false, message: "Username atau password salah" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      recordLoginFailure(rateLimitKey);
      return res
        .status(401)
        .json({ success: false, message: "Username atau password salah" });
    }

    const token = jwt.sign(
      {
        id: user.id_user,
        username: user.username,
        role: user.role,
        fakultasId: user.fakultas_id,
        unitUniversitasId: user.unit_universitas_id,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    recordLoginSuccess(rateLimitKey);

    return res.json({
      success: true,
      message: "Login Berhasil",
      token,
      user: {
        id: user.id_user,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
