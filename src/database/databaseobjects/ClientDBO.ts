import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';

export class ClientDBO extends Typegoose {
  @prop({ required: true, unique: true })
  userId?: number;

  @prop()
  role?: string;

  @prop()
  description?: string;

  @prop()
  pictureUri?: string;

  @prop()
  conversations?: [];

  @prop()
  groupchats?: [];

  @prop()
  lastLogin?: string;

  @prop()
  friends?: [];

  @prop()
  friendRequest?: [];

  @prop()
  sentFriendRequests?: [];

  @prop()
  createdAt?: string;

  @prop()
  updatedAt?: string;
}
