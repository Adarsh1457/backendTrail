const Attendance = require('../models/Attendance');
const MonthlySummary = require('../models/MonthlySummary');

async function createOrUpdateAttendance(employeeId, date, status, checkIn, checkOut) {
  let attendance = await Attendance.findOne({ employee: employeeId, date });

  if (!attendance) {
    attendance = new Attendance({
      employee: employeeId,
      date,
      status,
      checkIns: [],
      checkOuts: [],
    });
  }

  if (checkIn) {
    attendance.checkIns.push(checkIn);
  }

  if (checkOut) {
    attendance.checkOuts.push(checkOut);
  }

  attendance.status = status;

  // Calculate total working hours
  attendance.totalWorkingHours = calculateWorkingHours(attendance.checkIns, attendance.checkOuts);

  await attendance.save();
  await updateMonthlySummary(employeeId, date);

  return attendance;
}

function calculateWorkingHours(checkIns, checkOuts) {
  let totalHours = 0;
  for (let i = 0; i < checkIns.length && i < checkOuts.length; i++) {
    const duration = (checkOuts[i].time - checkIns[i].time) / (1000 * 60 * 60); // Convert to hours
    totalHours += duration;
  }
  return totalHours;
}

async function updateMonthlySummary(employeeId, date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  let summary = await MonthlySummary.findOne({ employee: employeeId, year, month });

  if (!summary) {
    summary = new MonthlySummary({
      employee: employeeId,
      year,
      month,
    });
  }

  // Calculate summary data
  const monthAttendance = await Attendance.find({
    employee: employeeId,
    date: {
      $gte: new Date(year, month, 1),
      $lt: new Date(year, month + 1, 1)
    }
  });

  summary.workingDays = monthAttendance.length;
  summary.leaveDays = monthAttendance.filter(a => a.status === 'leave').length;
  summary.absentDays = monthAttendance.filter(a => a.status === 'absent').length;
  summary.insiteDays = monthAttendance.filter(a => a.status === 'insite').length;
  summary.offsiteDays = monthAttendance.filter(a => a.status === 'offsite').length;
  summary.totalWorkingHours = monthAttendance.reduce((sum, a) => sum + a.totalWorkingHours, 0);

  await summary.save();
}

module.exports = {
  createOrUpdateAttendance,
  updateMonthlySummary,
};