// connection should be passed
const bcrypt = require('bcrypt');
const userSchema = require('./models/userSchema.js');
const config = require('../config/config.js');

// will be called once all parts are accounted for
const authRegister = async (dbConn, user) => {
  try {
    // will modify the password to be encypted using bcrypt
    user.password = await bcrypt.hash(user.password, config.rptNumber);
    // create the new schema and add it to the database
    const newUser = new userSchema(user);
    const result = await newUser.save();
    // if successful it will be saved
    return {isRegistered: true};
  } catch (error) {
    return {error: error};
  }
}

module.exports = authRegister;
