import mongo from './mongo.js';
import express from 'express';
import routes from './routes';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(express.json());
app.use('/', routes);

mongo.connect();

const server = app.listen(process.env.PORT || 4000, function () {
  console.log('Listening on port ' + server.address().port);
});
