const mongoose = require('mongoose');

const monthlySummarySchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  workingDays: { type: Number, default: 0 },
  leaveDays: { type: Number, default: 0 },
  absentDays: { type: Number, default: 0 },
  totalWorkingHours: { type: Number, default: 0 },
  insiteDays: { type: Number, default: 0 },
  offsiteDays: { type: Number, default: 0 }
}, { timestamps: true });

monthlySummarySchema.index({ employee: 1, year: 1, month: 1 }, { unique: true });

const MonthlySummary = mongoose.model('MonthlySummary', monthlySummarySchema);

module.exports = MonthlySummary;