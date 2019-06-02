import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketio from 'socket.io';

import { Message } from '../models/index';

export class Socket {
  static readonly PORT: number = 3133;
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.port = process.env.PORT || Socket.PORT;
    this.io = socketio(this.server);

    this.listen();
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log(`socket server running on port ${this.port}`);
    });

    this.io.on('connect', (socket: socketio.Socket) => {
      console.log('Connected client on port %s.', this.port);
      socket.on('message', (m: Message) => {
        console.log('[server](message): %s', JSON.stringify(m));
        this.io.emit('message', m);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  getApp(): express.Application {
    return this.app;
  }
}
