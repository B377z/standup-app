// services/speakerProfiles/speakerProfileService.js
const express = require('express');
const router = express.Router();
const SpeakerProfile = require('../../models/SpeakerProfile');

// Create a new speaker profile
router.post('/', async (req, res) => {
  try {
    const speakerProfile = new SpeakerProfile(req.body);
    await speakerProfile.save();
    res.status(201).json(speakerProfile);
  } catch (error) {
    res.status(500).json({ error: 'Error creating speaker profile' });
  }
});

// Get all speaker profiles
router.get('/', async (req, res) => {
  try {
    const speakerProfiles = await SpeakerProfile.find().populate('talks');
    res.json(speakerProfiles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching speaker profiles' });
  }
});

// Update a speaker profile
router.put('/:id', async (req, res) => {
  try {
    const speakerProfile = await SpeakerProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(speakerProfile);
  } catch (error) {
    res.status(500).json({ error: 'Error updating speaker profile' });
  }
});

// Delete a speaker profile
router.delete('/:id', async (req, res) => {
  try {
    await SpeakerProfile.findByIdAndDelete(req.params.id);
    res.json({ message: 'Speaker profile deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting speaker profile' });
  }
});

module.exports = router;
