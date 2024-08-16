const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');

async function createEmployee(employeeData) {
  const employee = new Employee(employeeData);
  await employee.save();
  return employee;
}

async function getEmployeeById(id) {
  return Employee.findById(id);
}

async function updateEmployee(id, updateData) {
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }
  return Employee.findByIdAndUpdate(id, updateData, { new: true });
}

async function deleteEmployee(id) {
  return Employee.findByIdAndDelete(id);
}

async function getEmployeesByDepartment(department) {
  return Employee.find({ department });
}

module.exports = {
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeesByDepartment,
};  