import * as express from 'express';

export abstract class AbstractServer {
  private express: express.Application;
  private port: number;

  constructor(_port: number) {
    this.port = _port;
    this.express = express();
  }

  protected getExpress(): express.Application {
    return this.express;
  }

  protected getPort(): number {
    return this.port;
  }

  protected listen(): void {
    this.getExpress().listen(this.getPort(), () => {
      console.log(`API is running on port ${this.getPort()}`);
    });
  }
}
