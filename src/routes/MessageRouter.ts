import { Router } from 'express';
import { MessageController } from '../controllers/MessageController';

export const messageRouter = Router();

messageRouter.get(
  '/:userId/conversations/:chatId/messages/:messageId',
  MessageController.getById
);
messageRouter.post(
  '/:userId/conversations/:chatId/messages',
  MessageController.postById
);
