import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { routes } from '../routes/index';

export class API {
  express: express.Application;
  static readonly PORT: number = 3132;
  private port: string | number;

  constructor(_express: express.Application) {
    this.port = process.env.PORT || API.PORT;
    this.express = _express;
    this.setDefaults();
    this.mountRoutes();
    this.listen();
  }

  private listen(): void {
    this.express.listen(this.port, () => {
      console.log(`API is running on port ${this.port}`);
    });
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
