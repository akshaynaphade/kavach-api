const express = require('express');
const router = express.Router();
const PasswordEntry = require('../models/PasswordEntry');

// Save Password
router.post('/save', async (req, res) => {
  const { userId, platform, username, password } = req.body;
  try {
    const entry = new PasswordEntry({ userId, platform, username, password });
    await entry.save();
    res.status(201).json({ message: 'Password saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save password' });
  }
});

// Get All Passwords for a User
router.get('/:userId', async (req, res) => {
  try {
    const entries = await PasswordEntry.find({ userId: req.params.userId });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch passwords' });
  }
});

module.exports = router;
