// services/sponsors/sponsorService.js
const express = require('express');
const router = express.Router();
const Sponsor = require('../../models/Sponsor');

// Create a new sponsor
router.post('/', async (req, res) => {
  try {
    const sponsor = new Sponsor(req.body);
    await sponsor.save();
    res.status(201).json(sponsor);
  } catch (error) {
    res.status(500).json({ error: 'Error creating sponsor' });
  }
});

// Get all sponsors
router.get('/', async (req, res) => {
  try {
    const sponsors = await Sponsor.find();
    res.json(sponsors);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching sponsors' });
  }
});

// Update a sponsor
router.put('/:id', async (req, res) => {
  try {
    const sponsor = await Sponsor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(sponsor);
  } catch (error) {
    res.status(500).json({ error: 'Error updating sponsor' });
  }
});

// Delete a sponsor
router.delete('/:id', async (req, res) => {
  try {
    await Sponsor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sponsor deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting sponsor' });
  }
});

module.exports = router;
