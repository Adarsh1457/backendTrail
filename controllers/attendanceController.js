const attendanceService = require('../services/attendanceService');
const geofencingService = require('../services/geofencingService');

exports.checkIn = async (req, res, next) => {
    try {
        const { latitude, longitude } = req.body;
        const employeeId = req.employee._id;

        const isWithinGeofence = await geofencingService.isWithinGeofence(employeeId, latitude, longitude);
        if (!isWithinGeofence) {
            return res.status(400).json({ message: 'You are not within the office geofence' });
        }

        const checkIn = await attendanceService.checkIn(employeeId, latitude, longitude);
        res.json({ message: 'Checked in successfully', checkIn });
    } catch (error) {
        next(error);
    }
};

exports.checkOut = async (req, res, next) => {
    try {
        const { latitude, longitude } = req.body;
        const employeeId = req.employee._id;

        const checkOut = await attendanceService.checkOut(employeeId, latitude, longitude);
        res.json({ message: 'Checked out successfully', checkOut });
    } catch (error) {
        next(error);
    }
};

exports.getAttendanceHistory = async (req, res, next) => {
    try {
        const employeeId = req.employee._id;
        const history = await attendanceService.getAttendanceHistory(employeeId);
        res.json(history);
    } catch (error) {
        next(error);
    }
};

exports.getMonthlySummary = async (req, res, next) => {
    try {
        const employeeId = req.employee._id;
        const { year, month } = req.query;
        const summary = await attendanceService.getMonthlySummary(employeeId, year, month);
        res.json(summary);
    } catch (error) {
        next(error);
    }
};