# Express API Project

This project is an Express-based API that handles account and product management.

## Features

- Express server setup
- JSON body parsing
- URL-encoded data parsing
- API routes for account and product modules
- JWT middleware for authentication
- Error handling middleware
- Sequelize ORM integration

## Getting Started

1. Install dependencies:

2. Set up environment variables:
Create a `.env` file in the root directory and add necessary variables (e.g., PORT, JWT_SECRET, DB_CONFIG).

3. Start the server:

## API Routes

The API routes are prefixed with `/api` and include:
- Account management routes
- Product management routes

## Middleware

- JWT middleware for token-based authentication
- Error handling middleware for centralized error management

## Database

The project uses Sequelize ORM for database operations. Uncomment the `sequelize.sync()` line in `main.ts` to sync your database schema.

## Environment

The server runs on the port specified in the PORT environment variable, defaulting to 3000 if not set.

## Development

To run the server in development mode:

This will start the server and automatically restart it when changes are detected.

## Production

For production deployment, ensure all necessary environment variables are set, including NODE_ENV="production".

