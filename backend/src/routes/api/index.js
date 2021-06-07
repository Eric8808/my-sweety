import { Router } from 'express';
import account from './account'
import scheduling from './scheduling'

const router = Router();

router.use('/account', account)
router.use('/scheduling', scheduling)

export default router;
