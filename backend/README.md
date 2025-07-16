# Leaderboard Backend API

Backend service for the Leaderboard application with pagination, validation, and middleware.

## Features

- User management with pagination
- Points claiming and history tracking
- Server-side pagination
- Input validation
- Rate limiting
- Error handling
- Request logging

## Project Structure

```
backend/
├── controllers/       # Business logic
│   ├── userController.js
│   └── pointController.js
├── middleware/        # Middleware functions
│   ├── auth.js        # Authentication middleware
│   ├── errorHandler.js # Global error handler
│   ├── index.js       # Middleware exports
│   ├── logger.js      # Request logger
│   ├── rateLimit.js   # Rate limiting
│   └── validate.js    # Input validation
├── models/            # MongoDB models
│   ├── User.js
│   └── PointHistory.js
├── routes/            # API routes
│   ├── users.js
│   └── points.js
├── .env               # Environment variables
├── package.json       # Dependencies
└── server.js          # Main server file
```

## API Endpoints

### Users

- `GET /api/users` - Get paginated users with rankings
  - Query params: `page`, `limit`
- `POST /api/users` - Add a new user
  - Body: `{ name, profileImage }`
- `POST /api/users/init` - Initialize default users

### Points

- `POST /api/points/claim` - Claim points for a user
  - Body: `{ userId }`
  - Rate limited to 5 requests per minute
- `GET /api/points/history/:userId` - Get paginated point history for a specific user
  - Query params: `page`, `limit`
- `GET /api/points/history` - Get all paginated point history
  - Query params: `page`, `limit`

## Middleware

- **Authentication**: JWT-based auth for protected routes
- **Validation**: Input validation using Joi
- **Rate Limiting**: Prevents API abuse
- **Error Handling**: Global error handler
- **Logging**: Request logging with response time

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/leaderboard
   JWT_SECRET=your_jwt_secret
   ```

3. Start the server:
   ```
   npm run dev
   ```