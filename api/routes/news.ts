import {Router} from "express";
import mysqlDb from "../helpers/mysqlConnection";
import {NewsItem} from "../types";
import {ResultSetHeader, RowDataPacket} from "mysql2";
import {imageUpload} from "../helpers/multer";

const newsRouter = Router();

newsRouter.post('/', imageUpload.single('image'), async (req, res, next) => {
  try{
    const newsItem: NewsItem = {
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
    };

    const [results] = await mysqlDb.getConnection().query(
      'INSERT INTO items (title, description, image) VALUES (?, ?, ?)',
      [newsItem.title, newsItem.description, newsItem.image],
    ) as ResultSetHeader[];

    res.send({
      id: results.insertId,
      ...newsItem,
    });
  } catch (error) {
    return next(error);
  }
});

newsRouter.get('/',  async (req, res, next) => {
  try {
    const [results] = await mysqlDb.getConnection().query('SELECT * FROM items');
    res.send(results);
  } catch (error) {
    return next(error);
  }
});

newsRouter.get('/:id', async (req, res, next) => {
  try {
    const [results] = await mysqlDb.getConnection().query(
      'select * from items where id = ?',
      [req.params.id],
    ) as RowDataPacket[];
    res.send(results);
  } catch (error) {
    return next(error);
  }
});

newsRouter.delete('/:id', async (req, res, next) => {
  try {
    await mysqlDb.getConnection().query(
      'DELETE FROM items WHERE id = ?',
      [req.params.id],
    );

    res.send('delete news id ' + req.params.id);
  } catch (error) {
    return next(error);
  }
});

export default newsRouter;