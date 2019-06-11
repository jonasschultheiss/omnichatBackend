import { createServer, Server } from 'http';
import * as socketio from 'socket.io';

import { Message } from '../models/index';
import { AbstractServer } from './AbstractServer';

export class Socket extends AbstractServer {
  private server: Server;
  private io: SocketIO.Server;

  constructor(_port: number) {
    super(_port);
    this.server = createServer(this.getExpress());
    this.io = socketio(this.server);

    this.listen();
  }

  protected listen(): void {
    this.server.listen(this.getPort(), () => {
      console.log(`socket server running on port ${this.getPort()}`);
    });

    this.io.on('connect', (socket: socketio.Socket) => {
      console.log('Connected client on port %s.', this.getPort());
      console.log(`socket id: ${socket.id}`);
      socket.on('message', (m: Message) => {
        console.log('[server](message): %s', JSON.stringify(m));
        this.io.emit('message', m);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
}
