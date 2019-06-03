import * as express from 'express';
import { Server } from 'http';

export abstract class AbstractServer {
  private express: express.Application;
  // private http: Server;
  private port: number;

  constructor(_port: number) {
    this.port = _port;
    this.express = express();
    // this.http = new Server();
  }

  protected getExpress(): express.Application {
    return this.express;
  }

  protected getPort(): number {
    return this.port;
  }

  abstract listen(): void;
}
