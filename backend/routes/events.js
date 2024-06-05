const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Event = require('../models/Event');
const Proposal = require('../models/Proposal');


// Endpoint to create an event
router.post('/', async (req, res) => {
    const { title, description, date, location, duration, proposalId } = req.body;

    try {
        // Check if the proposal exists
        const proposal = await Proposal.findById(proposalId);
        if (!proposal) {
            return res.status(404).json({ error: 'Proposal not found' });
        }

        // Create new event
        const event = new Event({
            title,
            description,
            date,
            location,
            duration,
            speakers: [proposal.speakerEmail],  // Use speakerEmail as the speaker
            proposal: proposalId
        });

        await event.save();
        res.status(201).json(event);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Error creating event' });
    }
});

// Endpoint to get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().populate('speakers').populate('proposal');
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching events' });
    }
});

module.exports = router;
