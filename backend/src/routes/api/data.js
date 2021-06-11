import { Router } from 'express';
const router = Router()
//http://localhost:4000/api/data/XXX
router.get('/init',async (req, res)=>{
    const {username} = req.query
    console.log(`User ${username} comes to init data!`)
})

router.post('/update',async (req, res)=>{
    const {username} = req.body
    console.log(`User ${username} comes to update data!`)
})

export default router