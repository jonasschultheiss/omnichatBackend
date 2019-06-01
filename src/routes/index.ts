import { Router } from 'express';
import { miscRouter } from './misc';

export const routes = Router();

routes.use('/', miscRouter);
