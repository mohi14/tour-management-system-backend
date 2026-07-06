# Tour Management System

Backend API for a tour management platform built with Express, TypeScript, MongoDB, Redis, Passport, Cloudinary, and EJS.

## Features

- User authentication with local login and Google OAuth
- Role-based authorization for admin and user flows
- Tour, division, booking, payment, OTP, and stats modules
- Redis-backed OTP and token-related flows
- Cloudinary file upload support
- Swagger API documentation
- Health endpoints for liveness and readiness checks

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- Redis
- Passport.js
- Cloudinary
- Swagger UI
- EJS

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Setup

1. Install dependencies.

```bash
npm install
```

2. Create a `.env` file in the project root and provide the required variables.

3. Start the development server.

```bash
npm run dev
```

## Environment Variables

The app validates these variables at startup:

- `PORT`
- `DB_URL`
- `NODE_ENV`
- `BCRYPT_SALT_ROUND`
- `JWT_ACCESS_SECRET`
- `JWT_ACCESS_EXPIRES`
- `JWT_REFRESH_SECRET`
- `JWT_REFRESH_EXPIRES`
- `SUPER_ADMIN_EMAIL`
- `SUPER_ADMIN_PASSWORD`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CALLBACK_URL`
- `EXPRESS_SESSION_SECRET`
- `FRONTEND_URL`
- `SSL_STORE_ID`
- `SSL_STORE_PASS`
- `SSL_PAYMENT_API`
- `SSL_VALIDATION_API`
- `SSL_SUCCESS_FRONTEND_URL`
- `SSL_FAIL_FRONTEND_URL`
- `SSL_CANCEL_FRONTEND_URL`
- `SSL_SUCCESS_BACKEND_URL`
- `SSL_FAIL_BACKEND_URL`
- `SSL_CANCEL_BACKEND_URL`
- `SSL_IPN_URL`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_PORT`
- `SMTP_HOST`
- `SMTP_FROM`
- `REDIS_HOST`
- `REDIS_PORT`
- `REDIS_USERNAME`
- `REDIS_PASSWORD`

## API Base Path

All API routes are mounted under:

```bash
/api/v1
```

## Swagger Documentation

- Swagger UI: `/api-docs`
- Raw OpenAPI JSON: `/api-docs.json`

Swagger UI is enabled automatically outside production, or when `ENABLE_SWAGGER=true` is set.

## Health Routes

- `GET /api/v1/health` - liveness check
- `GET /api/v1/health/live` - explicit liveness check
- `GET /api/v1/health/ready` - readiness check for MongoDB and Redis

## Main Modules

- `/api/v1/auth`
- `/api/v1/user`
- `/api/v1/division`
- `/api/v1/tour`
- `/api/v1/booking`
- `/api/v1/payment`
- `/api/v1/otp`
- `/api/v1/stats`

## Deployment Notes

- The project is configured for Vercel using `vercel.json`.
- The build command is `npm run build`.
- In production, set `ENABLE_SWAGGER=true` if you want Swagger UI to remain visible.

## Project Structure

```text
src/
  app.ts
  server.ts
  app/
    config/
    middlewares/
    modules/
    routes/
    utils/
```

## License

No license has been specified yet.