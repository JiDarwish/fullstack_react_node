const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: {
    type: String,
    required: 'GoogleId is required!'
  },
  credits: {
    default: 0,
    type: Number
  }
});

mongoose.model('users', userSchema);
