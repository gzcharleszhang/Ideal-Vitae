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
  username: {
    type: String,
    required: true,
    unique: true
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
    sectionOfResume: {
      type: String,
      required: true
    },
    date: {
      type: String,
    },
    subtopicOfSection: {
      type: String
    },
    sectionSummary: [{
      pointIntro: {
        type: String
      },
      experience: {
        type: String
      },
    }],
    location: {
      type: String
    },
    topicOfSection: {
      type: String
    },
    entryType: {
      type: String,
    },
    startPeriod: {
      month: {
        type: String,
      },
      day: {
        type: Number,
      },
      year: {
        type: Number,
      },
    },
    endingPeriod: {
      month: {
        type: String,
      },
      day: {
        type: Number,
      },
      year: {
        type: Number,
      },
    },
  },
  ]
});

module.exports = mongoose.model('Users', userSchema);
