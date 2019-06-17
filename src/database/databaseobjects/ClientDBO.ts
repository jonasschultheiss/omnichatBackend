import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';
import { Chat } from '../../models/interfaces/IChat';
import { Friend } from '../../models/interfaces/IFriend';
import { FriendRequest } from '../../models/interfaces/IFriendRequest';

export class ClientDBO extends Typegoose {
  @prop({ required: true, unique: true })
  userId?: number;

  @prop()
  description?: string;

  @prop()
  pictureUri?: string;

  @prop()
  conversations?: Chat[];

  @prop()
  groupchats?: Chat[];

  @prop()
  lastLogin?: number;

  @prop()
  friends?: Friend[];

  @prop()
  friendRequests?: FriendRequest[];

  @prop()
  sentFriendRequests?: FriendRequest[];

  @prop()
  createdAt?: number;
}
