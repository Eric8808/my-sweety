import { Router } from 'express';
const router = Router()

//http://localhost:4000/api/scheduling/XXX
router.post('/calculate', async (req, res)=>{
    // receive something
    // const XXXX = req.body

    // send something
    // res.json({
    //     XXXX:YYYY,
    //     ZZZZ:AAAA
    // })
})

router.get('/data', async(req, res)=>{
    // res.json({
    //     XXXX:YYYY,
    //     ZZZZ:AAAA
    // })
})

export default router