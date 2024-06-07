const mongoose = require('mongoose');

const AttendeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  registeredAt: { type: Date, default: Date.now }
});

const Attendee = mongoose.model('Attendee', AttendeeSchema);
module.exports = Attendee;
