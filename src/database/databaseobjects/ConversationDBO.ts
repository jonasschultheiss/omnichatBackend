import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';
import { Participant } from '../../models/interfaces/IParticipant';
import { Message } from '../../models/Index';

export class ConversationDBO extends Typegoose {
  @prop()
  participants?: Participant[];

  @prop()
  messages?: Message[];

  @prop()
  createdAt?: number;
}
