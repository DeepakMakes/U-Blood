const express = require('express');
const Donor = require('../models/donor');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Register as a donor
router.post('/register', authenticate, async (req, res) => {
  try {
    const { bloodGroup, location, lastDonationDate } = req.body;

    // Check if the user is already a donor
    const existingDonor = await Donor.findOne({ userId: req.user.id });
    if (existingDonor) {
      return res.status(400).json({ error: 'User is already registered as a donor' });
    }

    // Create a new donor
    const donor = new Donor({
      userId: req.user.id,
      bloodGroup,
      location,
      lastDonationDate,
    });

    await donor.save();
    res.status(201).json({ message: 'Donor registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while registering donor' });
  }
});

module.exports = router;

