import express from 'express';
import { loginController } from '../controllers/LoginController';
import { ProfileController } from '../controllers/ProfileController';
import { verifyToken } from '../middlewares/auth';
import { FasilitasController, RuangController } from '../controllers/RuangFasilitasController';
import { FakultasController } from '../controllers/FakultasController';

const router = express.Router();

// route untuk login user
router.post('/login', loginController);

// route untuk fetch data user
router.get('/profile', verifyToken, ProfileController);

// route untuk fetch data ruangan
router.get('/ruangan',verifyToken, RuangController);

// route untuk fetch data fasilitas
router.get('/fasilitas',verifyToken, FasilitasController);

// route untuk fetch data fakultas
router.get('/fakultas', verifyToken, FakultasController);

export default router;