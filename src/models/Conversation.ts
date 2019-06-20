import { AbstractChat } from './abstract/AbstractChat';
import { Participant, Message } from './interfaces/index';

import { InstanceType } from 'typegoose';
import { Model } from 'mongoose';
import { ConversationDBO } from '../database/databaseobjects/Index';

export class Conversation extends AbstractChat {
  private conversationDBO: Model<InstanceType<ConversationDBO>>;

  constructor(
    _participants: Participant[],
    _messages: Message[],
    _createdAt: number
  ) {
    super(_participants, _messages, _createdAt);
    this.conversationDBO = new ConversationDBO().getModelForClass(
      ConversationDBO
    );
  }

  load(): Promise<Conversation> {
    return new Promise((resolve, reject) => {
      try {
        this.conversationDBO.findOne();
      } catch (error) {
        console.error(`conversation could not be loaded: ${error.message}`);
        reject(error);
      }
    });
  }

  save(): Promise<Conversation> {
    return new Promise((resolve, reject) => {});
  }

  saveAsNew(): void {}
}
