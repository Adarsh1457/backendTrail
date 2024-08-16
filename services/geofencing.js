const geolib = require('geolib');
const config = require('../config/config');
const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');

const GEOFENCE_RADIUS = config.geofence.radius;
const officeLocations = config.offices;

// Office locations (example)
// const officeLocations = [
//   { name: 'Main Office', latitude: 40.7128, longitude: -74.0060 },
//   { name: 'Branch Office', latitude: 34.0522, longitude: -118.2437 },
// ];

async function isWithinGeofence(employeeId, currentLatitude, currentLongitude) {
  const employee = await Employee.findById(employeeId);
  if (!employee) {
    throw new Error('Employee not found');
  }

  for (const office of officeLocations) {
    const distance = geolib.getDistance(
      { latitude: currentLatitude, longitude: currentLongitude },
      { latitude: office.latitude, longitude: office.longitude }
    );

    if (distance <= GEOFENCE_RADIUS) {
      return { isWithin: true, officeName: office.name };
    }
  }

  return { isWithin: false, officeName: null };
}

async function handleCheckIn(employeeId, latitude, longitude) {
  const { isWithin, officeName } = await isWithinGeofence(employeeId, latitude, longitude);

  if (!isWithin) {
    throw new Error('Employee is not within any office geofence');
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let attendance = await Attendance.findOne({
    employee: employeeId,
    date: today
  });

  if (!attendance) {
    attendance = new Attendance({
      employee: employeeId,
      date: today,
      status: 'insite',
      checkIns: [],
      checkOuts: [],
      breaks: []
    });
  }

  attendance.checkIns.push({
    time: now,
    location: {
      type: 'Point',
      coordinates: [longitude, latitude]
    }
  });

  if (attendance.status === 'absent') {
    attendance.status = 'insite';
  }

  await attendance.save();

  return { message: `Checked in at ${officeName}`, timestamp: now };
}

// ... (include handleCheckOut and monitorEmployeeLocation functions here)

module.exports = {
  isWithinGeofence,
  handleCheckIn,
  // ... (export other functions)
};