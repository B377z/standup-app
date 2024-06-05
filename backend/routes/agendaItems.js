const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define the schema for agenda items
const AgendaItemSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: { type: String, default: 'pending' }
});

// Check if the model already exists before creating it
const AgendaItem = mongoose.models.AgendaItem || mongoose.model('AgendaItem', AgendaItemSchema, 'agenda-items');

// Endpoint to get all agenda items
router.get('/', async (req, res) => {
    console.log('Fetching all agenda items');
    try {
        const items = await AgendaItem.find();
        console.log('Agenda items fetched:', items);
        res.json(items);
    } catch (error) {
        console.error('Error fetching agenda items:', error);
        res.status(500).json({ error: 'Error fetching agenda items' });
    }
});

module.exports = router;
