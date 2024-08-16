const geolib = require('geolib');
const config = require('../config/config');

exports.isWithinGeofence = (employeeId, latitude, longitude) => {
    for (const office of config.offices) {
        const distance = geolib.getDistance(
            { latitude, longitude },
            { latitude: office.latitude, longitude: office.longitude }
        );

        if (distance <= config.geofence.radius) {
            return true;
        }
    }
    return false;
};