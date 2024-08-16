const express = require('express');
const router = express.Router();
const attendanceService = require('../services/attendanceService');
const geofencingService = require('../services/geofencing');
const authMiddleware = require('../middlewares/auth');

router.post('/check-in', authMiddleware, async (req, res) => {
  try {
    const { employeeId, latitude, longitude } = req.body;
    const result = await geofencingService.handleCheckIn(employeeId, latitude, longitude);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/check-out', authMiddleware, async (req, res) => {
  try {
    const { employeeId, latitude, longitude } = req.body;
    const result = await geofencingService.handleCheckOut(employeeId, latitude, longitude);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:employeeId/:date', authMiddleware, async (req, res) => {
  try {
    const { employeeId, date } = req.params;
    const attendance = await attendanceService.getAttendance(employeeId, new Date(date));
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/monthly-summary/:employeeId/:year/:month', authMiddleware, async (req, res) => {
  try {
    const { employeeId, year, month } = req.params;
    const summary = await attendanceService.getMonthlySummary(employeeId, parseInt(year), parseInt(month));
    if (!summary) {
      return res.status(404).json({ message: 'Monthly summary not found' });
    }
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;