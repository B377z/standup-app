const mongoose = require('mongoose');

// Define the schema for talks
const TalkSchema = new mongoose.Schema({
    title: String,
    speaker: String,
    speakerEmail: String,
    description: String,
    status: { type: String, default: 'pending' }
});

// Create the Talk model if it doesn't already exist
const Talk = mongoose.models.Talk || mongoose.model('Talk', TalkSchema);

module.exports = Talk;
