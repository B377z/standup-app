const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Event = require('../../models/Event');

// Endpoint to create an event
router.post('/', async (req, res) => {
    console.log('Creating event:', req.body);
    const event = new Event(req.body);

    try {
        await event.save();
        console.log('Event created:', event);
        res.status(201).json(event);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Error creating event' });
    }
});

// Endpoint to get all events
router.get('/', async (req, res) => {
    console.log('Fetching all events');
    try {
        const events = await Event.find();
        console.log('Events fetched:', events);
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Error fetching events' });
    }
});

module.exports = router;
