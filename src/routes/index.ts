import { Router } from 'express';
import { miscRouter } from './MiscRouter';
import { clientRouter } from './ClientRouter';

export const routes = Router();

routes.use('/', miscRouter);
routes.use('/clients', clientRouter);
