import { Request, Response } from 'express';
import { Conversation } from '../models/Index';
import { clientRouter } from '../routes/ClientRouter';

export class ConversationController {
  static getById = async (req: Request, res: Response) => {
    const conversation = new Conversation();
    console.log(req.params.chatId);
    conversation.setChatId(req.params.chatId);
    await conversation.load();
    res.json(conversation);
  };

  static postById = async (req: Request, res: Response) => {
    const conversation = new Conversation();
    conversation.addParticipantById(req.params.userId);
    conversation.addParticipantById(req.body.participant);
    conversation.setCreatedAt(Date.now());
    await conversation.saveAsNew();
    await conversation.addConversationToClient(
      req.params.userId,
      conversation.getChatId()
    );
    await conversation.addConversationToClient(
      req.body.participant,
      conversation.getChatId()
    );
    res.json(conversation);
  };
}
