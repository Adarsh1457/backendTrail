const employeeService = require('../services/employeeService');
const attendanceService = require('../services/attendanceService');
const leaveService = require('../services/leaveService');

exports.getAllEmployees = async (req, res, next) => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.json(employees);
    } catch (error) {
        next(error);
    }
};

exports.getCompanyAttendance = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const attendance = await attendanceService.getCompanyAttendance(startDate, endDate);
        res.json(attendance);
    } catch (error) {
        next(error);
    }
};

exports.getAllLeaveRequests = async (req, res, next) => {
    try {
        const leaveRequests = await leaveService.getAllLeaveRequests();
        res.json(leaveRequests);
    } catch (error) {
        next(error);
    }
};