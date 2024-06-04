const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define the schema for talks
const TalkSchema = new mongoose.Schema({
    title: String,
    speaker: String,
    speakerEmail: String,
    description: String,
    status: { type: String, default: 'pending' }
});

// Check if the model already exists before creating it
const Talk = mongoose.models.Talk || mongoose.model('Talk', TalkSchema, 'talks');

// Endpoint to get all approved talks
router.get('/', async (req, res) => {
    console.log('Fetching all approved talks');
    try {
        const talks = await Talk.find({ status: 'approved' });
        console.log('Approved talks fetched:', talks);
        res.json(talks);
    } catch (error) {
        console.error('Error fetching talks:', error);
        res.status(500).json({ error: 'Error fetching talks' });
    }
});

module.exports = router;

