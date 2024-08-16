const express = require('express');
const router = express.Router();
const employeeService = require('../services/employeeService');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const employee = await employeeService.updateEmployee(req.params.id, req.body);
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await employeeService.deleteEmployee(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/department/:department', authMiddleware, async (req, res) => {
  try {
    const employees = await employeeService.getEmployeesByDepartment(req.params.department);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;