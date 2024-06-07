// Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Logging the MongoDB connection URI for debugging
console.log('Connecting to MongoDB:', process.env.MONGODB_URI);

// Import service routers
const c4pService = require('./services/c4p/c4pService');
const notificationsService = require('./services/notifications/notificationsService');
const agendaService = require('./services/agenda/agendaService');
const eventsService = require('./services/events/eventsService');
const attendeeService = require('./services/attendees/attendeeService');
const speakerProfileService = require('./services/speakerProfiles/speakerProfileService');
const sponsorService = require('./services/sponsors/sponsorService');
const authService = require('./services/auth/authService'); // Add this line
const auth = require('./middleware/auth'); // Add this line

// Create an instance of Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware to enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Apply middleware to protect routes
app.use('/api/c4p/approve/:id', auth);
app.use('/api/c4p/reject/:id', auth);

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected');
        // Perform a test query to verify connection and list collections
        mongoose.connection.db.listCollections().toArray((err, collections) => {
            if (err) {
                console.error('Error listing collections:', err);
            } else {
                console.log('Collections:', collections);
            }
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Set up routes for different services
app.use('/api/auth', authService); // Add this line
app.use('/api/agenda', agendaService); // Route for Agenda service
app.use('/api/c4p', c4pService); // Route for Call for Proposals service
app.use('/api/notifications', notificationsService); // Route for Notifications service
app.use('/api/events', eventsService); // Route for Events service
app.use('/api/sponsors', sponsorService); // Route for Sponsors service
app.use('/api/speaker-profiles', speakerProfileService); // Route for Speaker Profiles service
app.use('/api/attendees', attendeeService); // Route for Attendees service

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
