const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  ticketId: { type: String, unique: true },
  name: { type: String, required: true },
  studentId: { type: String, required: true },
  phone: { type: String },
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  block: { type: String },
  floor: { type: String },
  room: { type: String },
  priority: { type: String, default: 'Medium' },
  status: { type: String, default: 'Open' },
  assignedTo: { type: String, default: 'Unassigned' },
}, { timestamps: true });

complaintSchema.pre('save', async function() {
  if (!this.ticketId) {
    const count = await mongoose.model('Complaint').countDocuments();
    this.ticketId = 'RES-' + String(count + 1001);
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);