module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES || 60 * 24, // 24 hours
    mongo: {
      uri: process.env.MONGODB_URI,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
    geofence: {
      radius: 200, // in meters
    },
    offices: [
      { name: 'Main Office', latitude: 40.7128, longitude: -74.0060 },
      { name: 'Branch Office', latitude: 34.0522, longitude: -118.2437 },
      // Add more office locations as needed
    ],
  };