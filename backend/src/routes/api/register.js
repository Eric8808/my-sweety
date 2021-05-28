import { Router } from 'express';
import bcrypt from 'bcrypt'
import User from '../../models/User.js';

const router = Router()

router.post('/',async (req, res)=>{
    try {
        const {user, pwd:plainTextPwd} = req.body
        const existing = await User.findOne({username:user});
        console.log(existing)
        if(existing) {
          res.json({
            message: `User ${user} already exists!`,
            success: false
          })
        }
        else{
          console.log("New Guy!")
          const hashPwd = await bcrypt.hash(plainTextPwd, 10)
          const newUser = await new User({username:user, password:hashPwd})
          console.log("Created new user.", newUser);
          newUser.save();
          res.json({
            message: `${user} Register successfully!`,
            success:true
          })
        }
      } catch (e) {
        console.log(e)
        res.json({ message: 'Something went wrong...' });
      }
})
export default router