const mongoose = require('mongoose');

const SponsorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  logo: { type: String },  // URL to sponsor's logo
  description: { type: String }
});

const Sponsor = mongoose.model('Sponsor', SponsorSchema);
module.exports = Sponsor;
