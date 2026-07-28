const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

<<<<<<< HEAD
function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// Shared handler for both /register and /signup (same logic, two URLs)
async function handleRegister(req, res) {
=======

router.post('/register', async (req, res) => {
>>>>>>> d738eb15ec1f017f13c63a44f62a091702501138
  try {
    // IMPORTANT: role is NOT read from req.body. Every signup is forced to
    // "student" here, on the server, so nobody can make themselves an admin
    // just by editing what their browser sends.
    const { name, email, password, studentId } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Please fill in all required fields.' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, error: 'Email already registered' });

    const user = new User({ name, email, password, studentId, role: 'student' });
    await user.save();

    const token = signToken(user);
    res.status(201).json({ success: true, token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

// POST - Register (kept for backwards compatibility)
router.post('/register', handleRegister);

// POST - Signup (this is the URL signup.js actually calls)
router.post('/signup', handleRegister);


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ success: false, error: 'Invalid email or password' });

    const token = signToken(user);
    res.json({ success: true, token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST - Admin login (same credentials, but rejects non-admins)
router.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ success: false, error: 'Invalid email or password' });

    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'You are not an admin.', notAdmin: true });
    }

    const token = signToken(user);
    res.json({ success: true, token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
