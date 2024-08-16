const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  status: { type: String, enum: ['assigned', 'in-progress', 'completed'], default: 'assigned' },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  type: { type: String, enum: ['insite', 'offsite'], required: true }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;