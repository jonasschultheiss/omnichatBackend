import { createServer, Server } from 'http';
import * as socketio from 'socket.io';

import { Message, Client, Conversation } from '../models/Index';
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
      let client: Client;
      console.log('Connected client on port %s.', this.getPort());
      console.log(`socket id: ${socket.id}`);
      socket.join('global');

      socket.on('init', async c => {
        console.log(c.userId);
        client = new Client(c.userId);
        await client.load();
        client.getDescription();
        client.setSocketId(socket.id);
        console.log(
          `client "${client.getUsername()}" connected as "${socket.id}"`
        );
        socket.on('message', message => {
          socket.emit('message', message);
        });
        // client.getConversations().forEach(conversation => {
        //   socket.join(conversation.id);
        //   socket.in(conversation.id).on('message', (message: Message) => {
        //     this.io.sockets.in(conversation.id).emit('message', message);
        //   });
        // });
      });

      socket.on('newConversation', c => {
        socket.join(c.chatId());
        socket.in(c.chatId).on('message', (message: Message) => {
          this.io.sockets.in(c.chatId).emit('message', message);
        });
      });

      socket.in('global').on('message', (m: Message) => {
        console.log('[server](message): %s', JSON.stringify(m));
        this.io.sockets.in('global').emit('message', m);
      });

      socket.on('disconnect', () => {
        client.setLastLogin(Date.now());
        console.log(`${client.getUsername()} disconnected`);
      });
    });
  }
}
