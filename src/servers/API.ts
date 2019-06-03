import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { routes } from '../routes/index';
import { AbstractServer } from './AbstractServer';

export class API extends AbstractServer {
  constructor(port: number) {
    super(port);
    this.setDefaults();
    this.mountRoutes();
    this.listen();
  }

  private listen(): void {
    this.getExpress().listen(this.getPort(), () => {
      console.log(`API is running on port ${this.getPort()}`);
    });
  }

  private setDefaults(): void {
    const express = this.getExpress();
    express.use(cors());
    express.use(helmet());
    express.use(bodyParser.json());
  }

  private mountRoutes(): void {
    this.express.use('/api/v1/', [routes]);
  }
}
