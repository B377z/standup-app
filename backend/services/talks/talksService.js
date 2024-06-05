const express = require('express');
const router = express.Router();
const Talk = require('../../models/Talk'); // Import the Talk model

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

