import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { routes } from './routes/index';
import * as socketio from 'socket.io';
import * as httpnode from 'http';

export class App {
  express: express.Application;
  http: httpnode.Server;
  socket: socketio.Server;

  constructor() {
    this.express = express();
    this.setDefaults();
    this.mountRoutes();
    this.http = new httpnode.Server(this.express);
    this.socket = new socketio();
  }

  private setDefaults(): void {
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(bodyParser.json());
  }

  private mountRoutes(): void {
    this.express.use('/api/v1/', [routes]);
  }
}
