const Task = require('../models/Task');

async function createTask(taskData) {
  const task = new Task(taskData);
  await task.save();
  return task;
}

async function getTaskById(id) {
  return Task.findById(id).populate('assignedTo assignedBy');
}

async function updateTask(id, updateData) {
  return Task.findByIdAndUpdate(id, updateData, { new: true });
}

async function deleteTask(id) {
  return Task.findByIdAndDelete(id);
}

async function getTasksByEmployee(employeeId) {
  return Task.find({ assignedTo: employeeId }).populate('assignedBy');
}

async function getTasksByStatus(status) {
  return Task.find({ status }).populate('assignedTo assignedBy');
}

module.exports = {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByEmployee,
  getTasksByStatus,
};