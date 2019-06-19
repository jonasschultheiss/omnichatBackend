import { Router } from 'express';
import { ClientController } from '../controllers/ClientController';

export const clientRouter = Router();

clientRouter.get('/:userId', ClientController.getById);
