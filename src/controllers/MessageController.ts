import { Request, Response } from 'express';
import { Conversation, Message } from '../models/Index';

export class MessageController {
  static getById = async (req: Request, res: Response) => {
    const message = new Message();
    message.setMessageId(req.params.messageId);
    await message.load();
    res.json(message);
  };

  static postById = async (req: Request, res: Response) => {
    const message = new Message();
    message.setSenderId(req.params.userId);
    message.setSenderName(req.body.senderName);
    message.setBody(req.body.body);
    message.setChatId(req.params.chatId);
    message.setTimestamp(Date.now());
    await message.saveAsNew();
    await message.addMessageToConversation(
      req.params.chatId,
      message.getMessageId()
    );
    res.json(message);
  };
}
