import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { routes } from './routes/index';

export class App {
  express: express.Application;

  constructor() {
    this.express = express();
    this.setDefaults();
    this.mountRoutes();
  }

  private setDefaults(): void {
    // this.express.set('port', 3131);
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(bodyParser.json());
  }

  private mountRoutes(): void {
    this.express.use('/api/v1/', [routes]);
  }
}
