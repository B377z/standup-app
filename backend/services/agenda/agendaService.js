const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define the schema for talks (same as proposals for simplicity)
const TalkSchema = new mongoose.Schema({
    title: String,
    speaker: String,
    speakerEmail: String,
    description: String,
    status: { type: String, default: 'pending' }
});

// Check if the model already exists before creating it
const Talk = mongoose.models.Talk || mongoose.model('Talk', TalkSchema);

// Endpoint to get the agenda (all approved talks)
router.get('/', async (req, res) => {
    console.log('Fetching the agenda (all approved talks)');
    try {
        const agenda = await Talk.find({ status: 'approved' });
        console.log('Agenda fetched:', agenda);
        res.json(agenda);
    } catch (error) {
        console.error('Error fetching the agenda:', error);
        res.status(500).json({ error: 'Error fetching the agenda' });
    }
});

module.exports = router;

