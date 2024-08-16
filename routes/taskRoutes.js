const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/employee/:employeeId', authMiddleware, async (req, res) => {
  try {
    const tasks = await taskService.getTasksByEmployee(req.params.employeeId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/status/:status', authMiddleware, async (req, res) => {
  try {
    const tasks = await taskService.getTasksByStatus(req.params.status);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;