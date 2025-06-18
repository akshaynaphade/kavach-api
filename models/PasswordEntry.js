const mongoose = require('mongoose');

const passwordEntrySchema = new mongoose.Schema({
  userId: String,
  platform: String,
  username: String,
  password: String
});

module.exports = mongoose.model('PasswordEntry', passwordEntrySchema);
