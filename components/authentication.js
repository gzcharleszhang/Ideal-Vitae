// connection should be passed
const bcrypt = require('bcrypt');
const userSchema = require('./models/userSchema.js');
const config = require('../config/config.js');

// will be called once all parts are accounted for
const authRegister = async (dbConn, user) => {
  try {
    console.log(`${user.password} and ${config.rptNumber}`);
    user.password = await bcrypt.hash(user.password, config.rptNumber);
    console.log(user);
    const newUser = new userSchema(user);
    const result = await newUser.save();
    return {isRegistered: true};
  } catch (error) {
    return {error: error};
  }
}


module.exports = authRegister;
