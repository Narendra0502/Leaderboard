# Leaderboard Application

A full-stack application that allows users to select from a list of users, claim random points, and view a dynamically updating leaderboard.

## Features

- User selection from a list of 10 pre-defined users
- Add new users to the system
- Claim random points (1-10) for selected users
- Real-time leaderboard updates
- Point history tracking
- Responsive design

## Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: Express.js (Node.js)
- **Database**: MongoDB

## Project Structure

```
leaderboard-app/
├── backend/             # Express.js backend
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── .env             # Environment variables
│   ├── package.json     # Backend dependencies
│   └── server.js        # Main server file
└── frontend/            # Next.js frontend
    ├── components/      # React components
    ├── pages/           # Next.js pages
    ├── public/          # Static assets
    ├── styles/          # CSS modules
    └── package.json     # Frontend dependencies
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/leaderboard
   ```
   Note: Update the MongoDB URI if you're using a remote database.

4. Start the backend server:
   ```
   npm run dev
   ```
   The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```
   The application will be available at http://localhost:3000

## API Endpoints

### Users

- `GET /api/users` - Get all users with rankings
- `POST /api/users` - Add a new user
- `POST /api/users/init` - Initialize default users

### Points

- `POST /api/points/claim` - Claim points for a user
- `GET /api/points/history` - Get all point history
- `GET /api/points/history/:userId` - Get point history for a specific user

## Database Schema

### User Model

```javascript
{
  name: String,
  points: Number,
  createdAt: Date
}
```

### PointHistory Model

```javascript
{
  userId: ObjectId (ref: 'User'),
  points: Number,
  timestamp: Date
}
```#   L e a d e r b o a r d 
 
 
