const mongoose = require('mongoose');

// creating a schema for the users
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  preferredName: {
    type: String,
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
  contact: [{
    type: {
      type: String,
      required: true
    },
    info: {
      type: String,
      required: true
    }
  }],
  sectionOfResume: [{
    topicOfSection: {
      type: String,
      required: true
    },
    date: {
      type: String,
    },
    titleAndPosition: {
      type: String
    },
    sectionSummary: [{
      experience: {
        type: String
      },
    }],
    location: {
      type: String
    },
    subtopicOfSection: {
      type: String
    },
    pointForm: {
      type: Boolean,
      required: true
    },
    keyWords: {
      type: String,
      required: true
    }
  }]
});

module.exports = mongoose.model('Users', userSchema);
