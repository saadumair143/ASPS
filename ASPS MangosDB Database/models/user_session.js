const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSessionSchema = new Schema({
  userId: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  isDeleted: {
      type: Boolean,
      default: false
  }
});

const userSession = mongoose.model('userSession', userSessionSchema);

module.exports = userSession;