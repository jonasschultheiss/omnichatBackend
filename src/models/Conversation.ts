import { AbstractChat } from './abstract/AbstractChat';
import { Participant, Message } from './interfaces/index';
import { InstanceType } from 'typegoose';
import { Model } from 'mongoose';
import { ConversationDBO, ClientDBO } from '../database/databaseobjects/Index';
import { Client } from './Client';

export class Conversation extends AbstractChat {
  private conversationDBO: Model<InstanceType<ConversationDBO>>;
  private clientDBO: Model<InstanceType<ClientDBO>>;

  constructor() {
    super();
    this.conversationDBO = new ConversationDBO().getModelForClass(
      ConversationDBO
    );
    this.clientDBO = new ConversationDBO().getModelForClass(ClientDBO);
  }

  load(): Promise<Conversation> {
    return new Promise((resolve, reject) => {
      try {
        this.conversationDBO
          .findOne({ chatId: this.getChatId() })
          .then(chat => {
            console.log(chat);
            this.setChatId(chat!.chatId!);
            this.setParticipants(chat!.participants!);
            this.setMessages(chat!.messages!);
            this.setParticipants(chat!.participants!);
            resolve();
          });
      } catch (error) {
        console.error(`conversation could not be loaded: ${error.message}`);
        reject(error);
      }
    });
  }

  save(): Promise<Conversation> {
    return new Promise((resolve, reject) => {
      try {
        this.conversationDBO
          .updateMany(
            { chatId: this.getChatId() },
            {
              chatId: this.getChatId(),
              participants: this.getParticipants(),
              messages: this.getMessages(),
            }
          )
          .then(resolve);
      } catch (error) {
        reject(error);
      }
    });
  }

  saveAsNew(): Promise<Conversation> {
    return new Promise(async (resolve, reject) => {
      try {
        const conversation = new this.conversationDBO({
          chatId: 0,
          participants: this.getParticipants(),
          messages: [],
          createdAt: Date.now(),
        });
        await conversation.save();
        this.setChatId(conversation._id);

        this.conversationDBO
          .updateOne({ _id: conversation._id }, { chatId: conversation._id })
          .then(() => {
            resolve();
          });
      } catch (error) {
        console.log(`conversation could not be saved: ${error.message}`);
        reject(error);
      }
    });
  }

  addConversationToClient(
    clientId: number,
    conversationId: string
  ): Promise<Conversation> {
    return new Promise(async (resolve, reject) => {
      const client = new Client(clientId);
      await client.load();
      client.addConversation(conversationId);
      client
        .save()
        .then(() => resolve())
        .catch(reject);
    });
  }
}
