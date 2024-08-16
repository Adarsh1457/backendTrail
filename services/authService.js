const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.registerEmployee = async (employeeData) => {
    const employee = new Employee(employeeData);
    await employee.save();
    return employee;
};

exports.loginEmployee = async ({ email, password }) => {
    const employee = await Employee.findOne({ email });
    if (!employee) {
        throw new Error('Authentication failed');
    }

    const isMatch = await employee.comparePassword(password);
    if (!isMatch) {
        throw new Error('Authentication failed');
    }

    const token = jwt.sign({ _id: employee._id.toString() }, config.jwtSecret, {
        expiresIn: config.jwtExpirationInterval
    });

    return { employee, token };
};