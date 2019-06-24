import { Router } from 'express';
import { ConversationController } from '../controllers/ConversationController';

export const conversationRouter = Router();

conversationRouter.get(
  '/:userId/conversations/:chatId',
  ConversationController.getById
);
conversationRouter.post(
  '/:userId/conversations/',
  ConversationController.postById
);
