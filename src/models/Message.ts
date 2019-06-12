export class Message {
  private senderId: number;
  private senderName: string;
  private body: string;
  private chatId: number;
  private isEdited: boolean;
  private timestamp: number;

  constructor(
    _senderId: number,
    _senderName: string,
    _body: string,
    _chatId: number,
    _isEdited: boolean,
    _timestamp: number
  ) {
    this.senderId = _senderId;
    this.senderName = _senderName;
    this.body = _body;
    this.chatId = _chatId;
    this.isEdited = _isEdited;
    this.timestamp = _timestamp;
  }

  getSenderId(): number {
    return this.senderId;
  }

  getSenderName(): string {
    return this.senderName;
  }

  getBody(): string {
    return this.body;
  }

  getChatId(): number {
    return this.chatId;
  }

  getIsEdited(): boolean {
    return this.isEdited;
  }

  getTimestamp(): number {
    return this.timestamp;
  }
}
