import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';

export class MessageDBO extends Typegoose {
  @prop()
  messageId?: string;

  @prop()
  chatId?: string;

  @prop()
  senderId?: number;

  @prop()
  senderName?: string;

  @prop()
  body?: string;

  @prop()
  isEdited?: boolean;

  @prop()
  timestamp?: number;
}
