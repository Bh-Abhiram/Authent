const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // hashed
  totpSecret: String,

  // 🔐 For password reset
  resetToken: String,
  resetTokenExpiration: Date,
});

module.exports = mongoose.model('User', UserSchema);
