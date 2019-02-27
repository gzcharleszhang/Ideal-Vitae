const mongoose = require('mongoose');

// creating a schema for the users
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  verified: {
    type: Boolean
  },
  sectionOfResume: [{
    topic: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    data: {
      type: String
    },
    location: {
      type: String
    },
    subtopic: {
      type: String
    },
    pointForm: {
      type: Boolean,
      required: true
    }
  }]
});

module.exports = mongoose.model('Users', userSchema);
