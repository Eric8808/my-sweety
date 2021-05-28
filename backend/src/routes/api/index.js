import { Router } from 'express';
import scoreCardRouter from './scoreCard';
import register from './register'

const router = Router();

router.use('/', scoreCardRouter);
router.use('/register', register)

export default router;
