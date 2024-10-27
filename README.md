# OTP System

This project implements a One-Time Password (OTP) system using the MERN stack (MongoDB, Express, React, Node.js).

## Features

- 4-digit OTP input system
- Automatic processing when all digits are entered
- Timer to prevent immediate resubmission
- Shake effect for incorrect OTP input
- Secure user session management
- Access token generation for authenticated users

## Prerequisites

- Node.js (v14 or later)
- MongoDB

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/otp-system.git
   cd otp-system
   ```

2. Install dependencies for both client and server:
   ```
   cd client && npm install
   cd ../server && npm install
   ```

3. Create a `.env` file in the server directory and add your MongoDB URI and JWT secret:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

## Running the Application

1. Start the server:
   ```
   cd server
   npm start
   ```

2. In a new terminal, start the client:
   ```
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to use the application.

## Testing

To test the OTP functionality:

1. Enter a phone number in the client application to generate an OTP.
2. Check the server console to see the generated OTP (in a real-world scenario, this would be sent to the user's phone).
3. Enter the OTP in the client application to verify it.

## Security Considerations

- The OTP is stored securely in the database and expires after 5 minutes.
- User sessions are managed using JWT tokens.
- The access token is not exposed on the frontend.
- All API endpoints use HTTPS in production.

## Future Improvements

- Implement rate limiting to prevent brute force attacks.
- Add phone number verification before sending OTP.
- Implement two-factor authentication for enhanced security.