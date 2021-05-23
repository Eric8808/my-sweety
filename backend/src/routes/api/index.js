import { Router } from 'express';
import scoreCardRouter from './scoreCard';
import register from './register'

const router = Router();

router.use('/', scoreCardRouter);
router.use('/', register)

export default router;
