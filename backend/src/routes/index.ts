import express from 'express';
import { loginController, meController } from '../controllers/LoginController';
import { loginSchema } from '../utils/validators/auth';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.post('/login', loginController);
router.get('/auth/me', verifyToken, meController);

export default router;