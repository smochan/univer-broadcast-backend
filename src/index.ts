import express, { Express, Request, Response, NextFunction } from 'express';
import db from './db';
import router from './routes';

const app: Express = express();

const start = async () => {
  await db.connect();

  const PORT = process.env.PORT || 3000;

  app.use('/', router);

  app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  });

  app.listen(PORT, function () {
    console.log('server started on port ' + PORT);
  });
}

start();