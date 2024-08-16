const authService = require('../services/authService');

exports.register = async (req, res, next) => {
    try {
        const employee = await authService.registerEmployee(req.body);
        res.status(201).json({
            message: 'Employee registered successfully',
            employee: employee
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { employee, token } = await authService.loginEmployee(req.body);
        res.json({ employee, token });
    } catch (error) {
        next(error);
    }
};

exports.logout = (req, res) => {
    // Implement logout logic if needed
    res.status(200).json({ message: 'Logged out successfully' });
};