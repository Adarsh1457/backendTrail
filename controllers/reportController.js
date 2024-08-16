const reportService = require('../services/reportService');

exports.getAttendanceSummary = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const summary = await reportService.getAttendanceSummary(startDate, endDate);
        res.json(summary);
    } catch (error) {
        next(error);
    }
};

exports.getEmployeePerformance = async (req, res, next) => {
    try {
        const { employeeId, year, month } = req.query;
        const performance = await reportService.getEmployeePerformance(employeeId, year, month);
        res.json(performance);
    } catch (error) {
        next(error);
    }
};

exports.getDepartmentAnalytics = async (req, res, next) => {
    try {
        const { department, year, month } = req.query;
        const analytics = await reportService.getDepartmentAnalytics(department, year, month);
        res.json(analytics);
    } catch (error) {
        next(error);
    }
};