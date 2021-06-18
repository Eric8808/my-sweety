import { Router } from 'express';
import User from '../../models/User';
const router = Router()
//http://localhost:4000/api/data/XXX

const todoList = [
    {
      name: 'HW7',
      priority: 1,
      separate: 1,
      needtime: 1,
      deadline: '2021-06-21T00:00:00.000Z'
    },
    {
      name: 'HW8',
      priority: '2',
      separate: 1,
      needtime: 1,
      deadline: '2021-06-21T00:00:00.000Z'
    },
    {
      name: 'Hack 4',
      priority: '3',
      separate: 1,
      needtime: 1,
      deadline: '2021-06-30T00:00:00.000Z'
    },
    {
      name: 'Final Project',
      priority: '2',
      separate: 1,
      needtime: 1,
      deadline: '2021-06-30T00:00:00.000Z'
    }
]
const schedule = [
    { date: '2021-06-10T16:00:00.000Z', events: [ 'HW7' ] },
    { date: '2021-06-11T16:00:00.000Z', events: [ 'HW8' ] },
    { date: '2021-06-12T16:00:00.000Z', events: [ 'Hack 4' ] },
    { date: '2021-06-13T16:00:00.000Z', events: [ 'Final Project' ] }
]
const day = [3,2,1,4,2,3,2]
// const schedule
router.get('/init', async(req, res)=>{
    const {username} = req.query
    console.log(`User ${username} comes to init data!`)
    const {todoList, schedule, day} = await User.findOne({username:username});
    //take something from database 記得error handle
    if(day.length === 0){
      res.json({
        todoList: todoList,
        schedule: schedule,
        day: [1,1,1,1,1,1,1]
      })
    }
    else{
      res.json({
        todoList: todoList,
        schedule: schedule,
        day: day
      })
    }
})

router.post('/update', async(req, res)=>{
    const {username, todoList, schedule, day} = req.body
    console.log(`User ${username} comes to update data!`)
    console.log(todoList)
    console.log(schedule)
    console.log(day)
    await User.updateOne({username: username},{
      todoList: todoList,
      schedule: schedule,
      day: day
    })
    
    // save to database 記得error handle 也記得提醒小黑handle算不出來的例外
    res.json({message:'success'})
})

export default router