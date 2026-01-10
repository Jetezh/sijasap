import express from "express";
import { loginController } from "../controllers/LoginController";
import { ProfileController } from "../controllers/ProfileController";
import { verifyToken } from "../middlewares/auth";
import {
  FasilitasController,
  RuangController,
  RuanganDetailController,
} from "../controllers/RuangFasilitasController";
import { FakultasController } from "../controllers/FakultasController";
import { RuanganFasilitasController } from "../controllers/RuangFasilitasController";

const router = express.Router();

// route untuk login user
router.post("/login", loginController);

// route untuk fetch data user
router.get("/profile", verifyToken, ProfileController);

// route untuk fetch data ruangan
router.get("/ruangan", verifyToken, RuangController);

// route untuk fetch detail ruangan
router.get("/ruangan/:id_ruangan", verifyToken, RuanganDetailController);

// route untuk fetch data fasilitas
router.get("/fasilitas", verifyToken, FasilitasController);

// route untuk fetch data fakultas
router.get("/fakultas", verifyToken, FakultasController);

// route untuk fetch data ruangan memiliki fasilitas apa saja
router.get(
  "/ruangan-fasilitas/:id_ruangan",
  verifyToken,
  RuanganFasilitasController,
);

export default router;
