import { AbstractChat } from './abstract/AbstractChat';
import { Participant } from './interfaces/IParticipant';
import { Message } from './interfaces/IMessage';

export class Groupchat extends AbstractChat {
  private title: string;
  private description: string;
  private pictureUri: string;
  private admins: Participant[];

  constructor(
    _participants: Participant[],
    _messages: Message[],
    _createdAt: number,
    _title: string,
    _description: string,
    _pictureUri: string,
    _admins: Participant[]
  ) {
    super(_participants, _messages, _createdAt);
    this.title = _title;
    this.description = _description;
    this.pictureUri = _pictureUri;
    this.admins = _admins;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(_title: string): void {
    this.title = _title;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(_description): void {
    this.description = _description;
  }

  getPictureUri(): string {
    return this.pictureUri;
  }

  setPictureUri(_pictureUri: string): void {
    this.pictureUri = _pictureUri;
  }

  getAdmins(): {
    
  }
}
