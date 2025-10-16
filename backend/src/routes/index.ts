import express from 'express';
import { loginController } from '../controllers/LoginController';
import { ProfileController } from '../controllers/profileController';
import { loginSchema } from '../utils/validators/auth';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

// route untuk login user
router.post('/login', loginController);

// route untuk fetch data user dan verifikasi token
router.get('/auth/profile', verifyToken, ProfileController);

export default router;