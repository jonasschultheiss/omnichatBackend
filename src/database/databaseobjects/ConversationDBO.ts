import { prop, Typegoose, ModelType, InstanceType, pre } from 'typegoose';
import { Participant, Message } from './../../models/interfaces/index';

export class ConversationDBO extends Typegoose {
  @prop()
  chatId?: string;

  @prop()
  participants?: Participant[];

  @prop()
  messages?: Message[];

  @prop()
  createdAt?: number;
}
