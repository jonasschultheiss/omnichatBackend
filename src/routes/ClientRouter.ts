import { Router } from 'express';
import { ClientController } from '../controllers/ClientController';

export const clientRouter = Router();

clientRouter.get('/:userId', ClientController.getById);
clientRouter.patch('/:userId', ClientController.patchById);
clientRouter.post('/:userId', ClientController.postById);
