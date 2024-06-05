// services/c4p/c4pService.js
const express = require('express');
const mongoose = require('mongoose');
const Notification = require('../../model/Notifications');

const router = express.Router();

// Define the schema for proposals
const ProposalSchema = new mongoose.Schema({
    title: String,
    speaker: String,
    speakerEmail: String,
    description: String,
    status: { type: String, default: 'pending' }
});

// Check if the model already exists before creating it
const Proposal = mongoose.models.Proposal || mongoose.model('Proposal', ProposalSchema, 
'proposals');

// Use dynamic import for node-fetch
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const sendNotification = async (notification) => {
    try {
        const response = await fetch(`${process.env.NOTIFICATIONS_URL}/notify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(notification)
        });

        console.log(`Sending notification to ${process.env.NOTIFICATIONS_URL}/notify`);

        if (!response.ok) {
            throw new Error(`Failed to send notification: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Invalid content type in response from notification service');
        }

        const notificationResponse = await response.json();
        console.log('Notification response:', notificationResponse);
    } catch (error) {
        console.error('Error sending notification:', error.message);
        throw error;
    }
};

// Endpoint to submit a proposal
router.post('/', async (req, res) => {
    console.log('Submitting proposal:', req.body);
    const proposal = new Proposal(req.body);

    try {
        await proposal.save();
        console.log('Proposal saved:', proposal);

        const notification = new Notification({
            to: proposal.speakerEmail,
            subject: 'Proposal Submitted',
            text: `Dear ${proposal.speaker},\n\nYour proposal "${proposal.title}" has been submitted successfully.`
        });

        await notification.save();
        console.log('Notification saved:', notification);

        await sendNotification(notification);

        res.status(201).json(proposal);
    } catch (error) {
        console.error('Error submitting proposal:', error);
        res.status(500).json({ error: 'Error submitting proposal' });
    }
});

// Endpoint to get all proposals
router.get('/', async (req, res) => {
    console.log('Fetching all proposals');
    try {
        const proposals = await Proposal.find();
        console.log('Proposals fetched:', proposals);
        res.json(proposals);
    } catch (error) {
        console.error('Error fetching proposals:', error);
        res.status(500).json({ error: 'Error fetching proposals' });
    }
});

// Endpoint to approve a proposal
router.put('/approve/:id', async (req, res) => {
    console.log('Approving proposal ID:', req.params.id);
    try {
        const proposal = await Proposal.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
        if (!proposal) {
            console.log('Proposal not found:', req.params.id);
            return res.status(404).json({ error: 'Proposal not found' });
        }
        console.log('Proposal approved:', proposal);

        const notification = new Notification({
            to: proposal.speakerEmail,
            subject: 'Proposal Approved',
            text: `Dear ${proposal.speaker},\n\nYour proposal "${proposal.title}" has been approved.`
        });

        await notification.save();
        console.log('Notification saved:', notification);

        await sendNotification(notification);

        // Insert the approved proposal into the talks collection
        const Talk = mongoose.models.Talk || mongoose.model('Talk', ProposalSchema, 'talks');
        const newTalk = new Talk(proposal.toObject());
        await newTalk.save();

        res.json(proposal);
    } catch (error) {
        console.error('Error approving proposal:', error);
        res.status(500).json({ error: 'Error approving proposal' });
    }
});

// Endpoint to reject a proposal
router.put('/reject/:id', async (req, res) => {
    console.log('Rejecting proposal ID:', req.params.id);
    try {
        const proposal = await Proposal.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
        if (!proposal) {
            console.log('Proposal not found:', req.params.id);
            return res.status(404).json({ error: 'Proposal not found' });
        }
        console.log('Proposal rejected:', proposal);

        const notification = new Notification({
            to: proposal.speakerEmail,
            subject: 'Proposal Rejected',
            text: `Dear ${proposal.speaker},\n\nYour proposal "${proposal.title}" has been rejected.`
        });

        await notification.save();
        console.log('Notification saved:', notification);

        await sendNotification(notification);

        res.json(proposal);
    } catch (error) {
        console.error('Error rejecting proposal:', error);
        res.status(500).json({ error: 'Error rejecting proposal' });
    }
});

module.exports = router;
