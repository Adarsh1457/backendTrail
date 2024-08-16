const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['insite', 'offsite', 'absent', 'leave'], required: true },
  checkIns: [{
    time: { type: Date, required: true },
    location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true }
    }
  }],
  checkOuts: [{
    time: { type: Date, required: true },
    location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true }
    }
  }],
  breaks: [{
    startTime: { type: Date, required: true },
    endTime: { type: Date }
  }],
  totalWorkingHours: { type: Number, default: 0 },
  task: {
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    description: { type: String },
    status: { type: String, enum: ['assigned', 'in-progress', 'completed', 'none'], default: 'none' }
  },
  verifyStatus: { type: String, enum: ['pending', 'verified'], default: 'pending' }
}, { timestamps: true });

attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;