const mongoose = require('mongoose');

const SpeakerSchema = new mongoose.Schema({
  name: String,
  bio: String,
  email: String,
  // other speaker details
});

const Speaker = mongoose.model('Speaker', SpeakerSchema);

module.exports = Speaker;
