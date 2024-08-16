const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');

router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/employees', adminController.getAllEmployees);
router.get('/attendance', adminController.getCompanyAttendance);
router.get('/leave-requests', adminController.getAllLeaveRequests);

module.exports = router;