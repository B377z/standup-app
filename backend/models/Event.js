const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    location: String,
    duration: Number,
    speakers: [{ type: String }],  // Using speaker email as string
    proposal: { type: mongoose.Schema.Types.ObjectId, ref: 'Proposal' },
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;

