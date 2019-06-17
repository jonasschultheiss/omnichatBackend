import { AbstractChat } from './abstract/AbstractChat';
import { Participant } from './interfaces/IParticipant';
import { Message } from './interfaces/IMessage';

export class Conversation extends AbstractChat {
  constructor(
    _participants: Participant[],
    _messages: Message[],
    _createdAt: number
  ) {
    super(_participants, _messages, _createdAt);
  }
}
