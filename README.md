
# Event Registration System

A backend REST API for managing events and user registrations, developed as part of the CodeAlpha Backend Development Internship.

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Postman

## Features

- Create new events
- View all events
- View a single event by ID
- Register users for events
- View registrations for an event
- Cancel registrations
- Prevent duplicate registrations
- Reactivate cancelled registrations
- Track available seats
- Prevent registrations when an event is full

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/events | Create an event |
| GET | /api/events | Get all events |
| GET | /api/events/:id | Get event by ID |
| POST | /api/registrations | Register for an event |
| GET | /api/registrations/event/:eventId | View event registrations |
| PATCH | /api/registrations/:registrationId/cancel | Cancel registration |

## Installation

1. Clone the repository.
2. Navigate to the backend folder.
3. Install dependencies:

   npm install

4. Create a `.env` file inside the backend folder:

   PORT=3000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string

5. Start the development server:

   npm run dev

## Example: Create Event

POST /api/events

{
  "title": "Node.js Workshop",
  "description": "Learn backend development",
  "date": "2026-12-15T10:00:00.000Z",
  "location": "Bhopal",
  "capacity": 50
}

## Example: Register for Event

POST /api/registrations

{
  "eventId": "YOUR_EVENT_ID",
  "name": "Rahul Sharma",
  "email": "rahul@example.com"
}

## Project Structure

Event_Registration_System/
└── backend/
    ├── server.js
    ├── package.json
    └── src/
        ├── config/
        ├── controllers/
        ├── models/
        └── routes/

## Internship

CodeAlpha Backend Development Internship

## Author

GitHub: https://github.com/Prnce09
