const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    to: { type: String, required: true },
    subject: { type: String, required: true },
    text: { type: String, required: true },
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
