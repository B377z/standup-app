const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema({
  title: String,
  speaker: { type: mongoose.Schema.Types.ObjectId, ref: 'Speaker' },
  description: String,
  status: { type: String, default: 'pending' },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
});

const Proposal = mongoose.model('Proposal', ProposalSchema);

module.exports = Proposal;
