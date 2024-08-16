const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

exports.getAttendanceSummary = async (startDate, endDate) => {
    const summary = await Attendance.aggregate([
        {
            $match: {
                date: { $gte: new Date(startDate), $lte: new Date(endDate) }
            }
        },
        {
            $group: {
                _id: null,
                totalCheckIns: { $sum: { $size: "$checkIns" } },
                totalWorkingHours: { $sum: "$totalWorkingHours" },
                averageWorkingHours: { $avg: "$totalWorkingHours" }
            }
        }
    ]);
    return summary[0];
};

exports.getEmployeePerformance = async (employeeId, year, month) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    const performance = await Attendance.aggregate([
        {
            $match: {
                employee: employeeId,
                date: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $group: {
                _id: null,
                totalWorkingDays: { $sum: 1 },
                totalWorkingHours: { $sum: "$totalWorkingHours" },
                averageWorkingHours: { $avg: "$totalWorkingHours" },
                onTimeCheckIns: {
                    $sum: {
                        $cond: [
                            { $lte: [{ $hour: { $arrayElemAt: ["$checkIns.time", 0] } }, 9] },
                            1,
                            0
                        ]
                    }
                }
            }
        }
    ]);
    return performance[0];
};

exports.getDepartmentAnalytics = async (department, year, month) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    const employees = await Employee.find({ department });
    const employeeIds = employees.map(emp => emp._id);

    const analytics = await Attendance.aggregate([
        {
            $match: {
                employee: { $in: employeeIds },
                date: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $group: {
                _id: "$employee",
                totalWorkingDays: { $sum: 1 },
                totalWorkingHours: { $sum: "$totalWorkingHours" },
                averageWorkingHours: { $avg: "$totalWorkingHours" }
            }
        },
        {
            $group: {
                _id: null,
                employeeCount: { $sum: 1 },
                departmentTotalWorkingHours: { $sum: "$totalWorkingHours" },
                departmentAverageWorkingHours: { $avg: "$averageWorkingHours" }
            }
        }
    ]);
    return analytics[0];
};