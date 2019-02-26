const config = require('../config/config.js');
const mongoose = require('mongoose');

// use this for now until everything works then integrate pools
class Database {
  constructor() {
    this._connect();
  }

  async _connect() {
    try {
      await mongoose.connect(config.databaseConnection,
        { useNewUrlParser: true,
          useFindAndModify: false,
          useCreateIndex: true,
          poolSize: 10});
        const db = mongoose.connection;
  			db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', console.log.bind(console, 'connection successful'));
    } catch (error) {
      console.error({error:  "Connection failed"});
    }
  }
};

module.exports = new Database();
