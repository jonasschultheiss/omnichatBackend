import * as mongoose from 'mongoose';

export class DataBase {
  private mongoose: mongoose.Mongoose;
  private databaseUri: string;
  private db!: mongoose.Connection;

  constructor() {
    this.mongoose = mongoose;
    this.databaseUri = process.env.MONGO_URI || 'mongodb://localhost';
    this.createConnection();
  }

  private createConnection() {
    mongoose.connect(this.databaseUri, { useNewUrlParser: true }, error => {
      if (error) {
        console.error(error);
        process.exit(1);
      }
      this.db = mongoose.connection;
      this.db.on('error', console.error.bind(console, 'connection error:'));
      this.db.once('open', () => {
        console.log(`database connected successfully on ${this.databaseUri}`);
      });
    });
  }
}
