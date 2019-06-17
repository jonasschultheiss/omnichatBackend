import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';
import { Participant } from '../../models/interfaces/IParticipant';
import { Message } from '../../models/Index';

export class GroupchatDBO extends Typegoose {
  @prop()
  participants?: Participant[];

  @prop()
  messages?: Message[];

  @prop()
  createdAt?: number;

  @prop({ required: true })
  title?: string;

  @prop()
  description?: string;

  @prop()
  pictureUri?: string;

  @prop()
  admins?: Participant[];

  @prop()
  creator?: Participant;
}
