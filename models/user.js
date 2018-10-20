const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  
  {
    username: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique:true
    }
  }
)

module.exports = mongoose.model('User', UserSchema)