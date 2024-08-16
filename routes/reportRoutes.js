const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/attendance-summary', reportController.getAttendanceSummary);
router.get('/employee-performance', reportController.getEmployeePerformance);
router.get('/department-analytics', reportController.getDepartmentAnalytics);

module.exports = router;