const express = require('express');
const User = require('../models/User');
const BloodBank = require('../models/bloodBank');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Get all users
router.get('/users', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Manage blood banks
router.get('/blood-banks', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const bloodBanks = await BloodBank.find();
    res.status(200).json(bloodBanks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch blood banks' });
  }
});

module.exports = router;

