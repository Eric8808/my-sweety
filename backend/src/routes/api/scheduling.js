import { Router } from 'express';
import schedule from '../../schedule';

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
    const events = req.body.events;
    const available = req.body.available;
    const nowdata = new Date(req.body.nowdata);
    const edittime = req.body.edittime;
    
    let result = await schedule(
        events,
        available,
        nowdata,
        edittime
    );
    res.json({ans : result});

})

router.get('/data', async(req, res)=>{
    // res.json({
    //     XXXX:YYYY,
    //     ZZZZ:AAAA
    // })
})

export default router