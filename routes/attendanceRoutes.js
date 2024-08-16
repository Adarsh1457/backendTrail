const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.post('/check-in', attendanceController.checkIn);
router.post('/check-out', attendanceController.checkOut);
router.get('/history', attendanceController.getAttendanceHistory);
router.get('/monthly-summary', attendanceController.getMonthlySummary);

module.exports = router;