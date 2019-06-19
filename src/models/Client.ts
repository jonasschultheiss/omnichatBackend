import { User } from './User';
import { Chat } from './interfaces/IChat';
import { Friend } from './interfaces/IFriend';
import { FriendRequest } from './interfaces/IFriendRequest';
import { ClientDBO } from '../database/databaseobjects/Index';
import { InstanceType } from 'typegoose';
import { Model } from 'mongoose';
import { rejects } from 'assert';

export class Client extends User {
  private description: string;
  private pictureUri: string;
  private conversations: Chat[];
  private groupchats: Chat[];
  private lastLogin: number;
  private friends: Friend[];
  private friendRequests: FriendRequest[];
  private sentFriendRequests: FriendRequest[];
  private createdAt: number;
  private clientDBO: Model<InstanceType<ClientDBO>>;

  constructor(_userId: number, _username: string) {
    super(_userId, _username);

    this.description = '';
    this.pictureUri = '';
    this.conversations = [];
    this.groupchats = [];
    this.lastLogin = 0;
    this.friends = [];
    this.friendRequests = [];
    this.sentFriendRequests = [];
    this.createdAt = 0;

    this.clientDBO = new ClientDBO().getModelForClass(ClientDBO);
  }

  load(): Promise<Client> {
    return new Promise((resolve, reject) => {
      try {
        this.clientDBO.findOne({ userId: this.getUserId() }).then(client => {
          this.setDescription(client!.description!);
          this.setPictureUri(client!.pictureUri!);
          this.setConversations(client!.conversations!);
          this.setGroupchats(client!.groupchats!);
          this.setLastLogin(client!.lastLogin!);
          this.setFriends(client!.friends!);
          this.setFriendRequests(client!.friendRequests!);
          this.setSentFriendRequests(client!.sentFriendRequests!);
          this.setCreatedAt(client!.createdAt!);
          resolve();
        });
      } catch (error) {
        console.error(`client could not be loaded: ${error.message}`);
        reject(error);
      }
    });
  }

  save(): Promise<Client> {
    return new Promise((resolve, reject) => {
      try {
        this.clientDBO.updateMany(
          { userId: this.getUserId() },
          {
            userId: this.getUserId(),
            username: this.getUsername(),
            description: this.getDescription(),
            pictureUri: this.getPictureUri(),
            conversations: this.getConversations(),
            groupchats: this.getGroupchats(),
          }
        );

        resolve();
      } catch (error) {
        console.log(`client could not be saved: ${error.message}`);
        reject(error);
      }
    });
  }

  saveAsNew(): void {
    try {
      const client = new this.clientDBO({
        userId: this.getUserId(),
        username: this.getUsername(),
        description: this.getDescription(),
        pictureUri: this.getPictureUri(),
        conversations: this.getConversations(),
        groupchats: this.getGroupchats(),
      });
      client.save();
    } catch (error) {
      console.log(`client could not be saved: ${error.message}`);
    }
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  getPictureUri(): string {
    return this.pictureUri;
  }

  setPictureUri(uri: string): void {
    this.pictureUri = uri;
  }

  getConversations(): Chat[] {
    return this.conversations;
  }

  setConversations(conversations: Chat[]): void {
    this.conversations = conversations;
  }

  addConversation(chat: Chat): void {
    this.conversations.push(chat);
  }

  getGroupchats(): Chat[] {
    return this.groupchats;
  }

  setGroupchats(groupchats: Chat[]): void {
    this.groupchats = groupchats;
  }

  addGroupchat(chat: Chat): void {
    this.groupchats.push(chat);
  }

  leaveGroupchat(chat: Chat): void {
    this.groupchats = this.groupchats.filter(
      groupchat => groupchat.id !== chat.id
    );
  }

  getLastLogin(): number {
    return this.lastLogin;
  }

  setLastLogin(timestamp: number): void {
    this.lastLogin = timestamp;
  }

  getFriends(): Friend[] {
    return this.friends;
  }

  setFriends(friends: Friend[]): void {
    this.friends = friends;
  }

  addFriend(user: Friend): void {
    this.friends.push(user);
  }

  removeFriend(user: Friend): void {
    this.friends = this.friends.filter(friend => friend.id !== user.id);
  }

  getFriendRequests(): FriendRequest[] {
    return this.friendRequests;
  }

  setFriendRequests(requests: Friend[]): void {
    this.friendRequests = requests;
  }

  addFriendRequest(user: Friend): void {
    this.friendRequests.push(user);
  }

  removeFriendRequest(user: Friend): void {
    this.friendRequests = this.sentFriendRequests.filter(
      friend => friend.id !== user.id
    );
  }

  getSentFriendRequests(): FriendRequest[] {
    return this.sentFriendRequests;
  }

  setSentFriendRequests(requests: Friend[]): void {
    this.sentFriendRequests = requests;
  }

  addSentFriendRequest(user: Friend): void {
    this.sentFriendRequests.push(user);
  }

  removeSentFriendRequest(user: Friend): void {
    this.sentFriendRequests = this.sentFriendRequests.filter(
      friend => friend.id !== user.id
    );
  }

  setCreatedAt(timestamp: number): void {
    this.createdAt = timestamp;
  }

  getCreatedAt(): number {
    return this.createdAt;
  }
}
