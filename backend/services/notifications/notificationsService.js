const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const Notification = require('../../models/Notifications'); // Ensure this path is correct

// Configure the email transport using the default SMTP transport and a Gmail account
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    port: 587,
    secure: false, // use TLS
    tls: {
        rejectUnauthorized: false
    }
});

// Endpoint to send notifications
router.post('/notify', async (req, res) => {
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

// Endpoint to fetch all notifications
router.get('/', async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching notifications' });
    }
});

module.exports = router;
