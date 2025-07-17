import express from 'express';
import { loginController } from '../controllers/LoginController';
import { loginSchema } from '../utils/validators/auth';

const router = express.Router();

router.post('/login', loginController);

export default router;