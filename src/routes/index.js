import { Router } from 'express';
const router = Router();
import userRoute from './userRoute.js';

router.use('/user', userRoute);

export default router;