const MonthlySummary = require('../models/MonthlySummary');
const Attendance = require('../models/Attendance');
const { getStartOfMonth, getEndOfMonth, isWeekend, getDaysInMonth } = require('../utils/dateUtils');

async function generateMonthlySummary(employeeId, year, month) {
  const startDate = getStartOfMonth(new Date(year, month));
  const endDate = getEndOfMonth(new Date(year, month));

  const attendanceRecords = await Attendance.find({
    employee: employeeId,
    date: { $gte: startDate, $lte: endDate }
  });

  const workingDays = attendanceRecords.length;
  const totalDaysInMonth = getDaysInMonth(year, month);
  const weekendDays = Array.from({ length: totalDaysInMonth }, (_, i) => new Date(year, month, i + 1))
    .filter(date => isWeekend(date)).length;

  const leaveDays = attendanceRecords.filter(record => record.status === 'leave').length;
  const absentDays = totalDaysInMonth - weekendDays - workingDays - leaveDays;
  const insiteDays = attendanceRecords.filter(record => record.status === 'insite').length;
  const offsiteDays = attendanceRecords.filter(record => record.status === 'offsite').length;
  const totalWorkingHours = attendanceRecords.reduce((sum, record) => sum + record.totalWorkingHours, 0);

  const summary = new MonthlySummary({
    employee: employeeId,
    year,
    month,
    workingDays,
    leaveDays,
    absentDays,
    insiteDays,
    offsiteDays,
    totalWorkingHours
  });

  await summary.save();
  return summary;
}

async function getMonthlySummary(employeeId, year, month) {
  let summary = await MonthlySummary.findOne({ employee: employeeId, year, month });

  if (!summary) {
    summary = await generateMonthlySummary(employeeId, year, month);
  }

  return summary;
}

module.exports = {
  generateMonthlySummary,
  getMonthlySummary
};