const express = require('express');
const router = express.Router();
const Complaint = require('../models/complaint');

// POST - Create new complaint
router.post('/', async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();
    res.status(201).json({ success: true, ticketId: complaint.ticketId, complaint });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET - Get all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json({ success: true, complaints });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET - Get complaint by ticket ID
router.get('/:ticketId', async (req, res) => {
  try {
    const complaint = await Complaint.findOne({ ticketId: req.params.ticketId });
    if (!complaint) return res.status(404).json({ success: false, error: 'Complaint not found' });
    res.json({ success: true, complaint });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH - Update complaint status
router.patch('/:ticketId', async (req, res) => {
  try {
    const complaint = await Complaint.findOneAndUpdate(
      { ticketId: req.params.ticketId },
      req.body,
      { new: true }
    );
    if (!complaint) return res.status(404).json({ success: false, error: 'Complaint not found' });
    res.json({ success: true, complaint });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;