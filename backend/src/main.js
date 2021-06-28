import mongo from './mongo.js';
import express from 'express';
import routes from './routes/index.js';
import dotenv from 'dotenv'
import cors from 'cors'
import http from "http";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
dotenv.config()
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 80;
const app = express();
app.use(cors())
app.use(express.json());
app.use('/', routes);
app.use(express.static(path.join(__dirname, "../..", "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../..", "build", "index.html"));
});
const httpServer = http.createServer(app);
mongo.connect();
httpServer.listen(port, () => {
  console.log(`🚀 Server Ready at ${port}! 🚀`);
  console.log(__dirname)
  console.log(path.join(__dirname, "../..", "build"))
  // console.log(`Graphql Port at ${port}${server.subscriptionsPath}`);
});
// const server = app.listen(process.env.PORT || 4000, function () {
//   console.log('Listening on port ' + server.address().port);
// });
