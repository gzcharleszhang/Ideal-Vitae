// connection should be passed
import bcrypt from 'bcrypt';
import userSchema from './models/UserSchema.js';
import config from '../config/config.js';

const authRegister = async (dbConn, user) => {
  try {
    console.log(user);
    user.password = await bcrypt.hash(user.password, config.rptNumber);
    const newUser = new userSchema(user);
    const result = await newUser.save();
    return { isRegistered: true };
  } catch (error) {
    return { error: error };
  }
}

const addEntry = async (dbConn, newEntry) => {
  try {
    console.log(newEntry);
    const result = await userSchema.updateOne({ _id: newEntry.id }, { $push: {sectionOfResume: newEntry.sectionOfResume } });
    return { isSuccessful : true };
  } catch (error) {
    return { error: error };
  }
}

export { authRegister, addEntry };
