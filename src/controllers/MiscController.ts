import { Request, Response } from 'express';

export class MiscController {
  static ping = async (req: Request, res: Response) => {
    res.send('system is up and running.');
  };
}
