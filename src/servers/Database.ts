import * as mongoose from 'mongoose';
import { ClientDBO } from '../database/databaseobjects/ClientDBO';

export class Database {
  private mongoose: mongoose.Mongoose;
  private databaseUri: string;
  private db!: mongoose.Connection;

  constructor() {
    this.mongoose = mongoose;
    this.databaseUri =
      process.env.MONGO_URI || 'mongodb://localhost:27017/omnichat';
    this.createConnection();
  }

  private createConnection() {
    const gg = new ClientDBO();
    const ff = gg.getModelForClass(gg);

    this.mongoose.connect(
      this.databaseUri,
      { useNewUrlParser: true },
      error => {
        if (error) {
          console.error(error);
          process.exit(1);
        }
        this.db = this.mongoose.connection;
        this.db.on('error', console.error.bind(console, 'connection error:'));
        this.db.once('open', () => {
          console.log(`database connected successfully on ${this.databaseUri}`);
        });
      }
    );
  }
}
