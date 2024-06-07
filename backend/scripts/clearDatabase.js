require('dotenv').config();
const mongoose = require('mongoose');
const Attendee = require('../models/Attendee');
const Event = require('../models/Event');
const Notification = require('../models/Notifications');
const Proposal = require('../models/Proposal');
const User = require('../models/User');
const Agenda = require('../models/Agenda');
const Sponsor = require('../models/Sponsor');
const SpeakerProfile = require('../models/SpeakerProfile');

const clearDatabase = async () => {
	  try {
		      await mongoose.connect(process.env.MONGODB_URI);

		      await Attendee.deleteMany({});
		      await Event.deleteMany({});
		      await Notification.deleteMany({});
		      await Proposal.deleteMany({});
		      await User.deleteMany({});
		      await Agenda.deleteMany({});
		      await Sponsor.deleteMany({});
		      await SpeakerProfile.deleteMany({});

		      console.log('Database cleared successfully!');
		      mongoose.disconnect();
		    } catch (error) {
			        console.error('Error clearing database:', error);
			        mongoose.disconnect();
			      }
};

clearDatabase();



