// models/Proposal.js
const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  speaker: {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  description: { type: String, required: true },
  status: { type: String, required: true, default: 'pending' },
});

const Proposal = mongoose.model('Proposal', ProposalSchema);
module.exports = Proposal;

