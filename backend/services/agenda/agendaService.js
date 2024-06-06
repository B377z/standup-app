const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Agenda = require('../../models/Agenda');
const Proposal = require('../../models/Proposal');


// Endpoint to get all approved talks
router.get('/', async (req, res) => {
    console.log('Fetching all approved talks');
    try {
        const agendaItems = await Agenda.find().populate('speakers');
        console.log('Approved talks fetched:', );
        res.json(agendaItems);
    } catch (error) {
        console.error('Error fetching talks:', error);
        res.status(500).json({ error: 'Error fetching talks' });
    }
});

module.exports = router;

