const taskService = require('../services/taskService');

exports.createTask = async (req, res, next) => {
    try {
        const task = await taskService.createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await taskService.getTasks(req.employee._id);
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const task = await taskService.updateTask(req.params.taskId, req.body);
        res.json(task);
    } catch (error) {
        next(error);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        await taskService.deleteTask(req.params.taskId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};