const express = require('express');
const router = express.Router();
const Attendee = require('../../models/Attendee');

// Create a new attendee
router.post('/', async (req, res) => {
  try {
    const attendee = new Attendee(req.body);
    await attendee.save();
    res.status(201).json(attendee);
  } catch (error) {
    res.status(500).json({ error: 'Error creating attendee' });
  }
});

// Get all attendees
router.get('/', async (req, res) => {
  try {
    const attendees = await Attendee.find();
    res.json(attendees);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching attendees' });
  }
});

// Update an attendee
router.put('/:id', async (req, res) => {
  try {
    const attendee = await Attendee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(attendee);
  } catch (error) {
    res.status(500).json({ error: 'Error updating attendee' });
  }
});

// Delete an attendee
router.delete('/:id', async (req, res) => {
  try {
    await Attendee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Attendee deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting attendee' });
  }
});

module.exports = router;
