import { User } from './user';

export class Message {
  private sender: User;
  private content: string;
  private timestamp: string;

  constructor(_sender: User, _content: string, _timestamp: string) {
    this.sender = _sender;
    this.content = _content;
    this.timestamp = _timestamp;
  }

  getSenderId(): number {
    return this.sender.getId();
  }

  getContent(): string {
    return this.content;
  }

  getTimeStamp(): string {
    return this.timestamp;
  }
}
