import { Router } from 'express';
import { MiscController } from '../controllers/MiscController';

export const miscRouter = Router();

miscRouter.get('/ping', MiscController.ping);
