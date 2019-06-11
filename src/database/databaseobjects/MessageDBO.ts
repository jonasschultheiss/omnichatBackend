import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';

export class MessageDBO extends Typegoose {
  @prop({ required: true })
  senderId?: number;

  @prop({ required: true })
  senderName?: string;

  @prop({ required: true })
  chatId?: number;

  @prop({ required: true })
  isEdited?: string;

  @prop({ required: true })
  timestamp?: string;
}
