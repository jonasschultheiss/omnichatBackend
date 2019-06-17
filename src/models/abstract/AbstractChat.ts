import { Participant } from './../interfaces/IParticipant';
import { Message } from '../interfaces/IMessage';

export class AbstractChat {
  private participants: Participant[];
  private messages: Message[];
  private createdAt: number;

  constructor(
    _participants: Participant[],
    _messages: Message[],
    _createdAt: number
  ) {
    this.participants = _participants;
    this.messages = _messages;
    this.createdAt = _createdAt;
  }

  getParticipants(): Participant[] {
    return this.participants;
  }

  addParticipantById(participant: Participant): void {
    this.participants.push(participant);
  }

  removeParticipantById(participant: Participant): void {
    this.participants = this.participants.filter(e => e.id !== participant.id);
  }

  getMessages(): Message[] {
    return this.messages;
  }

  addMessageById(message: Message): void {
    this.messages.push(message);
  }

  getCreatedAt(): number {
    return this.createdAt;
  }
}
