require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

console.log('Connecting to MongoDB:', process.env.MONGODB_URI);

const agendaService = require('./services/agenda/agendaService');
const c4pService = require('./services/c4p/c4pService');
const notificationsService = require('./services/notifications/notificationsService');
const talksService = require('./services/talks/talksService');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected');
        // Perform a test query
        mongoose.connection.db.listCollections().toArray((err, collections) => {
            if (err) {
                console.error('Error listing collections:', err);
            } else {
                console.log('Collections:', collections);
            }
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/agenda', agendaService);
app.use('/api/c4p', c4pService);
app.use('/api/notifications', notificationsService);
app.use('/api/talks', talksService); // Add this line to use the Talks service

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

