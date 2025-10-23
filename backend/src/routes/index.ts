import express from 'express';
import { loginController } from '../controllers/LoginController';
import { ProfileController } from '../controllers/ProfileController';
import { verifyToken } from '../middlewares/auth';
import { FasilitasController, TotalRuangController } from '../controllers/RuangFasilitasController';

const router = express.Router();

// route untuk login user
router.post('/login', loginController);

// route untuk fetch data user
router.get('/profile', verifyToken, ProfileController);

// // route untuk fetch data ruangan
router.get('/ruangan',verifyToken, TotalRuangController);

// // route untuk fetch data fasilitas
router.get('/fasilitas',verifyToken, FasilitasController);

export default router;