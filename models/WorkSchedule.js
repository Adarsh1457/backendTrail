const mongoose = require('mongoose');

const workScheduleSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    type: { type: String, enum: ['fixed', 'flexible', 'shift'], required: true },
    startTime: { type: String, required: function() { return this.type !== 'flexible'; } },
    endTime: { type: String, required: function() { return this.type !== 'flexible'; } },
    daysOfWeek: { type: [Number], required: function() { return this.type === 'fixed'; } }, // 0 = Sunday, 1 = Monday, etc.
    requiredHours: { type: Number, required: function() { return this.type === 'flexible'; } },
    shiftRotation: { type: String, enum: ['weekly', 'biweekly', 'monthly'], required: function() { return this.type === 'shift'; } }
}, { timestamps: true });

module.exports = mongoose.model('WorkSchedule', workScheduleSchema);