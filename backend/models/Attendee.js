const mongoose = require('mongoose');

const AttendeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
});

const Attendee = mongoose.model('Attendee', AttendeeSchema);

module.exports = Attendee;
