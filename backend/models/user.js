const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  studentId: { type: String },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
}, { timestamps: true });

<<<<<<< HEAD
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

=======
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
>>>>>>> d738eb15ec1f017f13c63a44f62a091702501138
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', userSchema);
