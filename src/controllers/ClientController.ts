import { Request, Response } from 'express';
import { Client } from '../models/Index';

export class ClientController {
  static getById = async (req: Request, res: Response) => {
    const client = new Client(req.params.userId);
    await client.load();
    res.json(client);
  };

  static patchById = async (req: Request, res: Response) => {
    const client = new Client(req.params.userId);
    await client.load();
    switch (req.body.prop) {
      case 'username':
        client.setUsername(req.body.value);
        break;
      case 'pictureUri':
        client.setPictureUri(req.body.value);
        break;
      default:
        break;
    }
    await client.save();
    res.json(client);
  };

  static postById = async (req: Request, res: Response) => {
    const client = new Client(req.params.userId);
    client.setUsername(req.body.username);
    client.setDescription(req.body.description);
    client.setPictureUri(req.body.pictureUri);
    client.setLastLogin(Date.now());
    client.setCreatedAt(Date.now());
    client.saveAsNew();
    res.json(client);
  };
}
