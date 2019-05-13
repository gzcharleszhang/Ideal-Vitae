// connection should be passed
import bcrypt from 'bcrypt';
import userSchema from './models/UserSchema.js';
import config from '../config/config.js';

const authRegister = async (user) => {
  try {
    user.password = await bcrypt.hash(user.password, config.rptNumber);
    const newUser = new userSchema(user);
    const result = await newUser.save();
    return { isRegistered: true };
  } catch (error) {
    return { error: error };
  }
}

const addEntry = async (newEntry) => {
  try {
    const result = await userSchema.updateOne({ _id: newEntry.id }, { $push: {resumeEntry: newEntry.resumeEntry } });
    return { isSuccessful : true };
  } catch (error) {
    return { error: error };
  }
}

const addContact = async (newContact) => {
  try {
    const result = await userSchema.updateOne({ _id: newContact.id }, { $push: {contact: newContact.contact } });
    return { isSuccessful : true };
  } catch (error) {
    return { error: error };
  }
}

const getContactsEntries = async (id) => {
  try {
    const result = await userSchema.find({_id: id});
    if (!(result && result[0])) {
      return { error: "No such user in the database!" };
    }

    const {
      contact,
      resumeEntry,
    } = result[0];
    return ({
      contact,
      resumeEntry,
    });
  } catch (error) {
    return { error: error }
  }
}

export {
  authRegister,
  addEntry,
  addContact,
  getContactsEntries,
};
