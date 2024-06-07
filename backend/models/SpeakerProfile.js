const mongoose = require('mongoose');

const SpeakerProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  photo: { type: String },  // URL to speaker's photo
  socialMedia: {
    twitter: { type: String },
    linkedin: { type: String },
    website: { type: String }
  },
  talks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Proposal' }]
});

const SpeakerProfile = mongoose.model('SpeakerProfile', SpeakerProfileSchema);
module.exports = SpeakerProfile;
