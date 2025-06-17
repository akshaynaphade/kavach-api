
/// models/PasswordEntry.js
const mongoose = require('mongoose');

const passwordEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  site: {
    type: String,
    required: true
  },
  encryptedPassword: {
    type: String,
    required: true
  },
  iv: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PasswordEntry', passwordEntrySchema);
