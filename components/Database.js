import config from '../config/config.js';
import mongoose from 'mongoose';

// use this for now until everything works then integrate pools
class Database {
  constructor() {
    this._connect();
  }

  async _connect() {
    try {
      await mongoose.connect(config.database.connection, config.database.requirements);
      const db = mongoose.connection;
  		db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', console.log.bind(console, 'connection successful'));
    } catch (error) {
      console.error({error:  "Connection failed"});
    }
  }
};

export default new Database();
