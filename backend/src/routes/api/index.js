import { Router } from 'express';
import account from './account.js'
import scheduling from './scheduling.js'
import data from './data.js'

const router = Router();

router.use('/account', account)
router.use('/scheduling', scheduling)
router.use('/data', data)

export default router;
