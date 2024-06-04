const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configure the email transport using the default SMTP transport and a Gmail account.
// Use port 587 (TLS) for Gmail
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
        res.status(200).json({ message: 'Notification sent' }); // Return JSON response
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending notification', details: error.message });
    }
});

module.exports = router;
