import {Router} from "express";
import {Comment} from "../types";
import {ResultSetHeader, RowDataPacket} from "mysql2";
import mysqlDb from "../helpers/mysqlConnection";

const commentsRouter = Router();

commentsRouter.post('/', async (req, res, next) => {
  try {
    const comment: Comment = {
      newsId: parseInt(req.body.newsId),
      author: req.body.author ? req.body.author : null,
      text: req.body.text,
    };

    const [results] = await mysqlDb.getConnection().query(
      'INSERT INTO comments (news_id, author, text) VALUES (?, IFNULL(?, \'Anonimus\'), ?)',
      [comment.newsId, comment.author, comment.text],
    ) as ResultSetHeader[];

    res.send({
      id: results.insertId,
      ...comment,
    });
  } catch (error) {
    return next(error);
  }
});

commentsRouter.get('/', async (req, res, next) => {
  try {
    if (Object.keys(req.query).length !== 0) {
      const [results] = await mysqlDb.getConnection().query(
        'SELECT id, author, text from comments where news_id = ?',
        [req.query.news_id],
      );
      res.send(results);
    } else {
      const [results] = await mysqlDb.getConnection().query(
        'SELECT * FROM comments',
      );
      res.send(results);
    }
  }catch (error) {
    return next(error);
  }
});

commentsRouter.delete('/:id', async (req, res, next) => {
  try {
    await mysqlDb.getConnection().query(
      'DELETE FROM comments WHERE id = ?',
      [req.params.id],
    );

    res.send('delete comment id ' + req.params.id);
  } catch (error) {
    return next(error);
  }
});

export default commentsRouter;