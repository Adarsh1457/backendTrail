const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');

router.use(authMiddleware);

router.get('/my-schedule', scheduleController.getMySchedule);
router.use(adminMiddleware);
router.post('/create', scheduleController.createSchedule);
router.put('/update/:id', scheduleController.updateSchedule);

module.exports = router;