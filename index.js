/// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cors = require('cors');

const User = require('./models/User');
const PasswordEntry = require('./models/PasswordEntry');
const authenticateToken = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY);

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), encryptedData: encrypted };
}

function decrypt(encrypted, iv) {
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Signup
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username taken' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ username, passwordHash });
    await user.save();

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save Password
app.post('/api/passwords', authenticateToken, async (req, res) => {
  const { site, password } = req.body;
  console.log("Saving password for:", site);
  console.log("User ID:", req.userId);

  if (!site || !password) {
    return res.status(400).json({ message: 'Site and password required' });
  }

  try {
    const encrypted = encrypt(password);
    const entry = new PasswordEntry({
      userId: req.userId,
      site,
      encryptedPassword: encrypted.encryptedData,
      iv: encrypted.iv,
    });
    await entry.save();
    res.status(201).json({ message: 'Password saved' });
  } catch (err) {
    console.error("Save password error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Passwords
app.get('/api/passwords', authenticateToken, async (req, res) => {
  try {
    const entries = await PasswordEntry.find({ userId: req.userId });
    const results = entries.map(e => ({
      id: e._id,
      site: e.site,
      password: decrypt(e.encryptedPassword, e.iv),
    }));
    res.json(results);
  } catch (err) {
    console.error("Get passwords error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
