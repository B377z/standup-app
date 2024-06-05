const mongoose = require('mongoose');

const AgendaItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: 'pending' },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
});

const AgendaItem = mongoose.model('AgendaItem', AgendaItemSchema);

module.exports = AgendaItem;
