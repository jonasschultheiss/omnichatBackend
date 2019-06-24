import { MessageDBO, ConversationDBO } from '../database/databaseobjects/Index';
import { InstanceType } from 'typegoose';
import { Model } from 'mongoose';
import { Conversation } from './Conversation';
export class Message {
  private messageId: string;
  private senderId: number;
  private senderName: string;
  private body: string;
  private isEdited: boolean;
  private timestamp: number;
  private chatId: string;
  private messageDBO: Model<InstanceType<MessageDBO>>;
  private conversationDBO: Model<InstanceType<ConversationDBO>>;

  constructor() {
    this.messageId = '';
    this.senderId = 0;
    this.senderName = '';
    this.body = '';
    this.isEdited = false;
    this.timestamp = 0;
    this.chatId = '';
    this.messageDBO = new MessageDBO().getModelForClass(MessageDBO);
    this.conversationDBO = new ConversationDBO().getModelForClass(
      ConversationDBO
    );
  }

  load(): Promise<Message> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.messageDBO
          .findOne({ messageId: this.getMessageId() })
          .then(message => {
            this.setMessageId(message!.messageId!);
            this.setChatId(message!.chatId!);
            this.setSenderId(message!.senderId!);
            this.setSenderName(message!.senderName!);
            this.setBody(message!.body!);
            this.setIsEdited(message!.isEdited!);
            this.setTimestamp(message!.timestamp!);
          });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  setSenderId(senderId: number) {
    this.senderId = senderId;
  }

  setSenderName(senderName: string) {
    this.senderName = senderName;
  }

  setBody(body: string) {
    this.body = body;
  }

  setIsEdited(isEdited: boolean) {
    this.isEdited = isEdited;
  }

  setTimestamp(timestamp: number) {
    this.timestamp = timestamp;
  }

  save(): Promise<Message> {
    return new Promise((resolve, reject) => {
      try {
        this.messageDBO
          .updateMany(
            { messageId: this.getMessageId },
            {
              chatId: this.getChatId(),
              messageId: this.getMessageId(),
              senderId: this.getSenderId(),
              senderName: this.getSenderName(),
              body: this.getBody(),
              isEdited: this.getIsEdited(),
              timestamp: this.getTimestamp(),
            }
          )
          .then(resolve);
      } catch (error) {
        reject(error);
      }
    });
  }

  saveAsNew(): Promise<Message> {
    return new Promise(async (resolve, reject) => {
      try {
        const message = new this.messageDBO({
          messageId: this.getMessageId(),
          chatId: this.getChatId(),
          senderId: this.getSenderId(),
          senderName: this.getSenderName(),
          body: this.getBody(),
          isEdited: this.getIsEdited(),
          timestamp: this.getTimestamp(),
        });
        await message.save();
        this.setMessageId(message._id);

        this.messageDBO
          .updateOne({ _id: message._id }, { messageId: message._id })
          .then(() => resolve())
          .catch(reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  addMessageToConversation(
    conversationId: string,
    messageId: string
  ): Promise<Message> {
    return new Promise(async (resolve, reject) => {
      const conversation = new Conversation();
      conversation.setChatId(conversationId);
      await conversation.load();
      conversation.addMessageById(messageId);
      await conversation.save();
      resolve();
    });
  }

  getMessageId(): string {
    return this.messageId;
  }

  setMessageId(id: string): void {
    this.messageId = id;
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

  getIsEdited(): boolean {
    return this.isEdited;
  }

  getTimestamp(): number {
    return this.timestamp;
  }

  getChatId(): string {
    return this.chatId;
  }

  setChatId(chatId: string): void {
    this.chatId = chatId;
  }
}
