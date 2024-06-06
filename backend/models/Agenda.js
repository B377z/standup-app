// models/Agenda.js
const mongoose = require('mongoose');

const AgendaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  speakers: [{
    name: { type: String, required: true },
    email: { type: String, required: true },
  }],
  status: { type: String, required: true, default: 'approved' },
});

const Agenda = mongoose.model('Agenda', AgendaSchema);
module.exports = Agenda;


