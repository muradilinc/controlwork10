import express from 'express';
import cors from 'cors';
import mysqlDb from "./helpers/mysqlConnection";
import newsRouter from "./routes/news";
import commentsRouter from "./routes/comments";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/comments', commentsRouter);
app.use('/news', newsRouter);

const run = async () => {
  await mysqlDb.init();

  app.listen(port, () => {
    console.log('we r online, port: ' + port);
  });
};

void run();

