const LeaveRequest = require('../models/LeaveRequest');

exports.createLeaveRequest = async (employeeId, leaveData) => {
    const leaveRequest = new LeaveRequest({
        employee: employeeId,
        ...leaveData
    });
    await leaveRequest.save();
    return leaveRequest;
};

exports.getLeaveRequests = async (employeeId) => {
    return LeaveRequest.find({ employee: employeeId });
};

exports.approveLeaveRequest = async (leaveId, approverId) => {
    return LeaveRequest.findByIdAndUpdate(leaveId, {
        status: 'approved',
        approvedBy: approverId
    }, { new: true });
};

exports.rejectLeaveRequest = async (leaveId, approverId) => {
    return LeaveRequest.findByIdAndUpdate(leaveId, {
        status: 'rejected',
        approvedBy: approverId
    }, { new: true });
};