const express = require('express');
const router = express.Router();
const Event = require('../../models/Event');
const Agenda = require('../../models/Agenda'); // Import the Agenda model
const Proposal = require('../../models/Proposal'); // Import the Proposal model

// Endpoint to create an event
router.post('/', async (req, res) => {
    const { title, description, date, location, duration, speakers } = req.body;
  
    try {
      // Log the incoming request body
      console.log('Creating event with data:', req.body);
  
      // Validate speakers: check if the provided speaker IDs exist in the Agenda collection
      const speakerIds = await Agenda.find({ _id: { $in: speakers } }).select('_id');
      console.log('Found speaker IDs:', speakerIds);
  
      if (speakerIds.length !== speakers.length) {
        console.log('One or more speakers not found:', speakers);
        return res.status(400).json({ error: 'One or more speakers not found' });
      }
  
      // Create the event with the validated speaker IDs
      const event = new Event({
        title,
        description,
        date,
        location,
        duration,
        speakers: speakerIds,
        status: 'upcoming',
      });
  
      // Save the event to the database
      await event.save();
      console.log('Event created successfully:', event);
      res.status(201).json(event);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ error: 'Error creating event' });
    }
  });

// Endpoint to update an event to add more speakers
router.put('/:id/add-speakers', async (req, res) => {
  const { proposalIds } = req.body; // Extract the proposal IDs from the request body

  try {
    // Check if the provided proposal IDs exist and are approved
    const proposals = await Proposal.find({ _id: { $in: proposalIds }, status: 'approved' });

    if (proposals.length !== proposalIds.length) {
      return res.status(400).json({ error: 'Invalid or unapproved proposals' });
    }

    // Update the event to add more speakers
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { speakers: { $each: proposalIds } } }, // Add the proposal IDs to the speakers array
      { new: true }
    ).populate('speakers'); // Populate the speakers field with the speaker details

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(event); // Return the updated event
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Error updating event' });
  }
});

// Endpoint to get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('speakers'); // Populate the speakers field with the speaker details
    res.json(events); // Return the list of events
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Error fetching events' });
  }
});

module.exports = router;
