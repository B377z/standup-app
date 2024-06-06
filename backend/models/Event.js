// models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  duration: { type: Number, required: true }, // duration in minutes
  speakers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agenda' }],
  status: { type: String, required: true, default: 'upcoming' },
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
