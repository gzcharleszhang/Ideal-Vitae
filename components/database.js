const config = require('../config/config.js');
const mongoose = require('mongoose');

// use this for now until everything works then integrate pools
class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose.connect(config.databaseConnection, {useNewUrlParser: true})
    .then(() => {
      const db = mongoose.connection;
			db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', () => {

      });
    })
    .catch(err => {
      console.error("error");
    });
  }
};

module.exports = new Database();
