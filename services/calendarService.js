const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];
const calendar = google.calendar({ version: 'v3' });

const auth = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    SCOPES
);

exports.addEventToCalendar = async (employeeEmail, eventDetails) => {
    const event = {
        summary: eventDetails.summary,
        location: eventDetails.location,
        description: eventDetails.description,
        start: {
            dateTime: eventDetails.startDateTime,
            timeZone: 'UTC',
        },
        end: {
            dateTime: eventDetails.endDateTime,
            timeZone: 'UTC',
        },
        attendees: [{ email: employeeEmail }],
    };

    try {
        const response = await calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            resource: event,
        });
        return response.data;
    } catch (error) {
        console.error('Error adding event to calendar:', error);
        throw error;
    }
};