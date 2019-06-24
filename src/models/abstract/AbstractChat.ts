import { Message } from '../interfaces/IMessage';
import { Participant } from './../interfaces/index';

export class AbstractChat {
  private chatId: string;
  private participants: Participant[];
  private messages: Message[];
  private createdAt: number;

  constructor() {
    this.chatId = '';
    this.participants = [];
    this.messages = [];
    this.createdAt = 0;
  }

  getChatId(): string {
    return this.chatId;
  }

  setChatId(_chatId: string): void {
    this.chatId = _chatId;
  }

  getParticipants(): Participant[] {
    return this.participants;
  }

  setParticipants(participants: Participant[]) {
    this.participants = participants;
  }

  addParticipantById(participantId: number): void {
    this.participants.push({ id: participantId });
  }

  removeParticipantById(participant: Participant): void {
    this.participants = this.participants.filter(e => e.id !== participant.id);
  }

  getMessages(): Message[] {
    return this.messages;
  }

  setMessages(messages: Message[]): void {
    this.messages = messages;
  }

  addMessageById(messageId: string): void {
    this.messages.push({ id: messageId });
  }

  getCreatedAt(): number {
    return this.createdAt;
  }

  setCreatedAt(timestamp: number): void {
    this.createdAt = timestamp;
  }
}
