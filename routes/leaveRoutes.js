const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.post('/request', leaveController.createLeaveRequest);
router.get('/requests', leaveController.getLeaveRequests);
router.put('/requests/:id/approve', leaveController.approveLeaveRequest);
router.put('/requests/:id/reject', leaveController.rejectLeaveRequest);

module.exports = router;