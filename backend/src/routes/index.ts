import express from 'express';
import { loginController } from '../controllers/LoginController';
import { ProfileController } from '../controllers/ProfileController';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

// route untuk login user
router.post('/login', loginController);

// route untuk fetch data user
router.get('/auth/profile', verifyToken, ProfileController);

// // route untuk fetch data ruangan
// router.get('/ruangan');

// // route untuk fetch data fasilitas
// router.get('/fasilitas');

export default router;