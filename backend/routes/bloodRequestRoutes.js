const express = require('express');
const BloodRequest = require('../models/BloodRequest');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Create a blood request
router.post('/create', authenticate, async (req, res) => {
  try {
    const { bloodGroup, urgency, location, contactNumber } = req.body;

    if (!bloodGroup || !urgency || !location || !contactNumber) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const bloodRequest = new BloodRequest({
      userId: req.user.id,
      bloodGroup,
      urgency,
      location,
      contactNumber,
    });

    await bloodRequest.save();
    res.status(201).json({ message: 'Blood request created successfully!' });
  } catch (error) {
    console.error('Error creating blood request:', error);
    res.status(500).json({ error: 'Server error while creating blood request.' });
  }
});

// Fetch user-specific blood requests
router.get('/my-requests', authenticate, async (req, res) => {
  try {
    const requests = await BloodRequest.find({ userId: req.user.id });
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching user blood requests:', error);
    res.status(500).json({ error: 'Server error while fetching blood requests.' });
  }
});

module.exports = router;
