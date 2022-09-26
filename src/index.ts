import express, { Express, Request, Response, NextFunction } from 'express';
import db from './db';
import http from 'http';
import router from './routes';
import cors from 'cors';
import { Server } from 'socket.io';
import Message from './models/message';

import { adminJs, router as adminJsRouter } from './adminjs';

const app: Express = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  socket.on("chat message", async (msg, senderId, name) => {
    const data = new Message({
      senderId: senderId,
      message: msg,
      active: true
    })
    const res = await data.save();

    const newBroadcast = {
      _id: res._id,
      message: res.message,
      createdAt: res.createdAt,
      sender: {
        name: name
      },
      reactions: []
    }
    console.log(newBroadcast);
    io.emit("chat message", { newBroadcast: newBroadcast });
})});

server.listen(8000, () => {
  console.log('ws server is running on port 8000');
});

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

const start = async () => {
  await db.connect();
  app.use(adminJs.options.rootPath, adminJsRouter);

  const PORT = process.env.PORT || 8080;


  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
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