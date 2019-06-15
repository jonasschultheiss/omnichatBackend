import { User } from './User';
import { Chat } from './interfaces/IChat';
import { Friend } from './interfaces/IFriend';
import { FriendRequest } from './interfaces/IFriendRequest';

export class Client extends User {
  private description: string;
  private pictureUri: string;
  private conversations: Chat[];
  private groupchats: Chat[];
  private lastLogin: number;
  private friends: Friend[];
  private friendRequests: FriendRequest[];
  private sentFriendRequests: FriendRequest[];

  constructor(
    _userId: number,
    _username: string,
    _description: string,
    _pictureUri: string,
    _conversations: Chat[],
    _groupchats: Chat[],
    _lastLogin: number,
    _friends: Friend[],
    _friendRequest: FriendRequest[],
    _sentFriendRequests: FriendRequest[]
  ) {
    super(_userId, _username);
    this.description = _description;
    this.pictureUri = _pictureUri;
    this.conversations = _conversations;
    this.groupchats = _groupchats;
    this.lastLogin = _lastLogin;
    this.friends = _friends;
    this.friendRequests = _friendRequest;
    this.sentFriendRequests = _sentFriendRequests;
  }

  getDescription(): string {
    return this.description;
  }

  getPictureUri(): string {
    return this.pictureUri;
  }

  getConversations(): Chat[] {
    return this.conversations;
  }

  getGroupchats(): Chat[] {
    return this.groupchats;
  }

  getLastLogin(): number {
    return this.lastLogin;
  }

  getFriends(): Friend[] {
    return this.friends;
  }

  getFriendRequests(): FriendRequest[] {
    return this.friendRequests;
  }

  getSentFriendRequests(): FriendRequest[] {
    return this.sentFriendRequests;
  }
}
