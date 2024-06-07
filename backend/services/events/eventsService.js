const express = require('express');
const router = express.Router();
const Event = require('../../models/Event');
const Agenda = require('../../models/Agenda'); // Import the Agenda model
const Proposal = require('../../models/Proposal'); // Import the Proposal model
const auth = require('../../middleware/auth'); // Import the auth middleware

// Endpoint to create an event
router.post('/', auth, async (req, res) => {
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

// Endpoint to update an event to add more speakers using agenda IDs
router.put('/:id/add-speakers', async (req, res) => {
    const { agendaIds } = req.body;
  
    try {
      // Validate agenda items
      const agendas = await Agenda.find({ _id: { $in: agendaIds } });
  
      if (agendas.length !== agendaIds.length) {
        return res.status(400).json({ error: 'Invalid or unapproved agendas' });
      }
  
      // Update the event to add more speakers
      const event = await Event.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { speakers: { $each: agendaIds } } },
        { new: true }
      ).populate('speakers');
  
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: 'Error updating event' });
    }
  });
  
  // Endpoint to get all events
  router.get('/', async (req, res) => {
    try {
      const events = await Event.find().populate('speakers');
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching events' });
    }
  });

module.exports = router;
