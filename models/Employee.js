const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  branch: { type: String, required: true },
  role: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['insite', 'offsite', 'absent', 'leave'], 
    default: 'insite' 
  },
  employeeId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  adminUnder: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  profilePicLink: { type: String },
  password: { type: String, required: true },
  leaves: [{
    leaveType: { type: String, enum: ['sick', 'vacation', 'personal'] },
    status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true }
  }]
}, { timestamps: true });

employeeSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

employeeSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;