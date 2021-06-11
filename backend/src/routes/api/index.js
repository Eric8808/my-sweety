import { Router } from 'express';
import account from './account'
import scheduling from './scheduling'
import data from './data'

const router = Router();

router.use('/account', account)
router.use('/scheduling', scheduling)
router.use('/data', data)

export default router;
