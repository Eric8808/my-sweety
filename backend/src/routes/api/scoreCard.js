import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();


router.post('/create-card', async function (req, res) {
  try {
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    const {name, subject, score} = req.body
    const existing = await ScoreCard.findOne({name, subject});
    if(existing) {
      await ScoreCard.updateMany({name, subject}, {score})
      res.json({
        message: `Updating (${name}, ${subject}, ${score})`,
        card: {name, subject, score}
      })
    }
    else{
      console.log("New Guy!")
      const newScoreCard = new ScoreCard({name, subject, score});
      console.log("Created score card.", newScoreCard);
      newScoreCard.save();
      res.json({
        message: `Adding (${name}, ${subject}, ${score})`,
        card: {name, subject, score}
      })
    }
  } catch (e) {
    console.log(e)
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete('/delete-card', async function (req, res) {
  try{
    await ScoreCard.deleteMany({});
    res.json({
      message: "Database deleted"
    })
  }catch(e) {throw new Error("Database deletion failed");}
})
// TODO: implement the DB query
// route.xx(xxxx)
router.get('/query-card', async function(req, res){
  const {queryType, queryString} = req.query
  // console.log(queryType, queryString)
  const query = {}
  query[queryType] = queryString
  const data = await ScoreCard.find(query)
  if (data.length===0){
    console.log("not!")
    res.json({
      message: `${queryType} (${queryString}) not found!`, 
      messages:undefined
    })
  }
  else{
    const messages = data.map((item)=>`${item.name}, ${item.subject}, ${item.score}`)
    res.json({
    messages: messages
  })
  }
  
})

export default router;
