const express = require('express');
const router = express.Router();
const Notification = require('../model/Notifications');

// Endpoint to create a new notification
router.post('/', async (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);

        // Save notification to the database
        const notification = new Notification({ to, subject, text, status: 'sent' });
        await notification.save();

        res.status(200).json({ message: 'Notification sent' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending notification', details: error.message });
    }
});

// Endpoint to get all notifications
router.get('/', async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Error fetching notifications' });
    }
});

module.exports = router;
