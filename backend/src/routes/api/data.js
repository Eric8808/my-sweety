import { Router } from 'express';
import User from '../../models/User';
const router = Router()
//http://localhost:4000/api/data/XXX

// const todoList = [
//     {
//       name: 'HW7',
//       priority: 1,
//       separate: 1,
//       needtime: 1,
//       deadline: '2021-06-21T00:00:00.000Z'
//     },
//     {
//       name: 'HW8',
//       priority: '2',
//       separate: 1,
//       needtime: 1,
//       deadline: '2021-06-21T00:00:00.000Z'
//     },
//     {
//       name: 'Hack 4',
//       priority: '3',
//       separate: 1,
//       needtime: 1,
//       deadline: '2021-06-30T00:00:00.000Z'
//     },
//     {
//       name: 'Final Project',
//       priority: '2',
//       separate: 1,
//       needtime: 1,
//       deadline: '2021-06-30T00:00:00.000Z'
//     }
// ]
// const schedule = [
//     { date: '2021-06-10T16:00:00.000Z', events: [ 'HW7' ] },
//     { date: '2021-06-11T16:00:00.000Z', events: [ 'HW8' ] },
//     { date: '2021-06-12T16:00:00.000Z', events: [ 'Hack 4' ] },
//     { date: '2021-06-13T16:00:00.000Z', events: [ 'Final Project' ] }
// ]
// const day = [3,2,1,4,2,3,2]
// const schedule
router.get('/init', async(req, res)=>{
    const {username} = req.query
    console.log(`User ${username} comes to init data!`)
    const {todoList, schedule, scheduledList, day, completeDate} = await User.findOne({username:username});
    //take something from database 記得error handle
    console.log("todoList",todoList)
    console.log("schedule",schedule)
    console.log("day",day)
    console.log("scheduledList",scheduledList)
    console.log("completeDate",completeDate)
    if(day.length === 0){
      res.json({
        todoList: todoList,
        schedule: schedule,
        scheduledList: scheduledList,
        day: [1,1,1,1,1,1,1],
        completeDate:completeDate
      })
    }
    else{
      res.json({
        todoList: todoList,
        schedule: schedule,
        scheduledList: scheduledList,
        day: day,
        completeDate:completeDate
      })
    }
})

router.post('/update', async(req, res)=>{
    const {username, todoList, schedule, scheduledList, day, completeDate} = req.body
    console.log(`User ${username} comes to update data!`)
    console.log("todoList",todoList)
    console.log("schedule",schedule)
    console.log("day",day)
    console.log("scheduledList",scheduledList)
    console.log("completeDate",completeDate)
    try{
      await User.updateOne({username: username},{
        todoList: todoList,
        schedule: schedule,
        scheduledList: scheduledList,
        day: day,
        completeDate: completeDate
      })
      res.json({message:'success'})
    } catch(e){
      res.json({message:'error'})
    }
    
    
})

export default router