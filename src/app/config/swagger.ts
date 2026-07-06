export const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "Tour Management System API",
    version: "1.0.0",
    description:
      "OpenAPI documentation for the Tour Management System backend.",
  },
  servers: [
    {
      url: "/",
      description: "Current server",
    },
  ],
  tags: [
    { name: "Health", description: "Application status and landing page" },
    { name: "Auth", description: "Login, token, and password flows" },
    { name: "Users", description: "User management endpoints" },
    { name: "Divisions", description: "Division CRUD endpoints" },
    { name: "Tours", description: "Tour and tour type endpoints" },
    { name: "Bookings", description: "Booking lifecycle endpoints" },
    { name: "Payments", description: "Payment and invoice endpoints" },
    { name: "OTP", description: "OTP generation and verification" },
    { name: "Stats", description: "Admin analytics endpoints" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "accessToken",
      },
    },
    schemas: {
      ApiResponse: {
        type: "object",
        required: ["statusCode", "success", "message", "data"],
        properties: {
          statusCode: { type: "integer", example: 200 },
          success: { type: "boolean", example: true },
          message: { type: "string", example: "Request completed" },
          data: {},
          meta: {
            type: "object",
            properties: {
              page: { type: "integer", example: 1 },
              limit: { type: "integer", example: 10 },
              totalPage: { type: "integer", example: 5 },
              total: { type: "integer", example: 42 },
            },
          },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          message: { type: "string", example: "Validation failed" },
          errorSources: {
            type: "array",
            items: {
              type: "object",
              properties: {
                path: { type: "string", example: "email" },
                message: { type: "string", example: "Invalid email address" },
              },
            },
          },
        },
      },
      User: {
        type: "object",
        properties: {
          _id: { type: "string", example: "66d1d1a4f1a2b3c4d5e6f789" },
          name: { type: "string", example: "John Doe" },
          email: { type: "string", example: "john@example.com" },
          phone: { type: "string", example: "+8801712345678" },
          address: { type: "string", example: "Dhaka, Bangladesh" },
          role: { type: "string", example: "USER" },
          isActive: { type: "string", example: "ACTIVE" },
          isVerified: { type: "boolean", example: true },
          picture: { type: "string", example: "https://..." },
        },
      },
      AuthTokens: {
        type: "object",
        properties: {
          accessToken: { type: "string" },
          refreshToken: { type: "string" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", example: "john@example.com" },
          password: { type: "string", example: "Password@123" },
        },
      },
      RegisterUserRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string", example: "John Doe" },
          email: { type: "string", example: "john@example.com" },
          password: { type: "string", example: "Password@123" },
          phone: { type: "string", example: "+8801712345678" },
          address: { type: "string", example: "Dhaka, Bangladesh" },
        },
      },
      UpdateUserRequest: {
        type: "object",
        properties: {
          name: { type: "string" },
          phone: { type: "string" },
          role: { type: "string", enum: ["SUPER_ADMIN", "ADMIN", "USER", "GUIDE"] },
          isActive: { type: "string", enum: ["ACTIVE", "INACTIVE", "BLOCKED"] },
          isDeleted: { type: "boolean" },
          isVerified: { type: "boolean" },
          address: { type: "string" },
        },
      },
      ForgotPasswordRequest: {
        type: "object",
        required: ["email"],
        properties: {
          email: { type: "string", example: "john@example.com" },
        },
      },
      ChangePasswordRequest: {
        type: "object",
        required: ["oldPassword", "newPassword"],
        properties: {
          oldPassword: { type: "string", example: "OldPassword@123" },
          newPassword: { type: "string", example: "NewPassword@123" },
        },
      },
      ResetPasswordRequest: {
        type: "object",
        required: ["password"],
        properties: {
          password: { type: "string", example: "NewPassword@123" },
        },
      },
      SetPasswordRequest: {
        type: "object",
        required: ["password"],
        properties: {
          password: { type: "string", example: "NewPassword@123" },
        },
      },
      Division: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          slug: { type: "string" },
          thumbnail: { type: "string" },
          description: { type: "string" },
        },
      },
      DivisionRequest: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", example: "Dhaka" },
          thumbnail: { type: "string", example: "https://..." },
          description: { type: "string", example: "Capital city division" },
        },
      },
      TourTypeRequest: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", example: "Adventure" },
        },
      },
      TourRequest: {
        type: "object",
        required: ["title", "tourType", "division"],
        properties: {
          title: { type: "string", example: "Sundarbans Explorer" },
          description: { type: "string" },
          location: { type: "string" },
          costFrom: { type: "number", example: 15000 },
          startDate: { type: "string", example: "2026-08-10" },
          endDate: { type: "string", example: "2026-08-15" },
          tourType: { type: "string", example: "Adventure" },
          included: { type: "array", items: { type: "string" } },
          excluded: { type: "array", items: { type: "string" } },
          amenities: { type: "array", items: { type: "string" } },
          tourPlan: { type: "array", items: { type: "string" } },
          maxGuest: { type: "number", example: 20 },
          minAge: { type: "number", example: 12 },
          division: { type: "string", example: "66d1d1a4f1a2b3c4d5e6f789" },
          departureLocation: { type: "string" },
          arrivalLocation: { type: "string" },
        },
      },
      BookingRequest: {
        type: "object",
        required: ["tour", "guestCount"],
        properties: {
          tour: { type: "string", example: "66d1d1a4f1a2b3c4d5e6f789" },
          guestCount: { type: "integer", example: 2 },
        },
      },
      BookingStatusRequest: {
        type: "object",
        required: ["status"],
        properties: {
          status: {
            type: "string",
            enum: ["PENDING", "CANCEL", "COMPLETE", "FAILED"],
          },
        },
      },
      OtpRequest: {
        type: "object",
        required: ["email"],
        properties: {
          email: { type: "string", example: "john@example.com" },
        },
      },
      OtpVerifyRequest: {
        type: "object",
        required: ["email", "otp"],
        properties: {
          email: { type: "string", example: "john@example.com" },
          otp: { type: "string", example: "123456" },
        },
      },
    },
  },
  paths: {
    "/": {
      get: {
        tags: ["Health"],
        summary: "Landing page",
        responses: {
          200: {
            description: "Home page rendered",
          },
        },
      },
    },
    "/api/v1/health": {
      get: {
        tags: ["Health"],
        summary: "Check service liveness",
        responses: {
          200: { description: "Service is alive" },
        },
      },
    },
    "/api/v1/health/live": {
      get: {
        tags: ["Health"],
        summary: "Check service liveness explicitly",
        responses: {
          200: { description: "Service is alive" },
        },
      },
    },
    "/api/v1/health/ready": {
      get: {
        tags: ["Health"],
        summary: "Check service readiness",
        responses: {
          200: { description: "Service is ready" },
          503: { description: "Service is not ready" },
        },
      },
    },
    "/api/v1/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Log in with email and password",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          200: { description: "Returns access and refresh tokens" },
          401: { description: "Invalid credentials" },
        },
      },
    },
    "/api/v1/auth/refresh-token": {
      post: {
        tags: ["Auth"],
        summary: "Issue a new access token",
        responses: {
          200: { description: "New token pair returned" },
          401: { description: "Missing or invalid refresh token" },
        },
      },
    },
    "/api/v1/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Clear authentication cookies",
        responses: {
          200: { description: "User logged out" },
        },
      },
    },
    "/api/v1/auth/forgot-password": {
      post: {
        tags: ["Auth"],
        summary: "Send password reset email",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ForgotPasswordRequest" },
            },
          },
        },
        responses: {
          200: { description: "Reset email sent" },
        },
      },
    },
    "/api/v1/auth/change-password": {
      post: {
        tags: ["Auth"],
        summary: "Change the current password",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ChangePasswordRequest" },
            },
          },
        },
        responses: {
          200: { description: "Password changed" },
          403: { description: "Unauthorized" },
        },
      },
    },
    "/api/v1/auth/set-password": {
      post: {
        tags: ["Auth"],
        summary: "Set a password for an authenticated account",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SetPasswordRequest" },
            },
          },
        },
        responses: {
          200: { description: "Password set" },
        },
      },
    },
    "/api/v1/auth/reset-password": {
      post: {
        tags: ["Auth"],
        summary: "Reset password from a recovery flow",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ResetPasswordRequest" },
            },
          },
        },
        responses: {
          200: { description: "Password reset" },
        },
      },
    },
    "/api/v1/auth/google": {
      get: {
        tags: ["Auth"],
        summary: "Start the Google OAuth flow",
        responses: {
          302: { description: "Redirects to Google" },
        },
      },
    },
    "/api/v1/auth/google/callback": {
      get: {
        tags: ["Auth"],
        summary: "Google OAuth callback",
        responses: {
          302: { description: "Redirects back to the frontend" },
        },
      },
    },
    "/api/v1/user/register": {
      post: {
        tags: ["Users"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterUserRequest" },
            },
          },
        },
        responses: {
          201: { description: "User created" },
          400: { description: "Validation error" },
        },
      },
    },
    "/api/v1/user/all-users": {
      get: {
        tags: ["Users"],
        summary: "Get all users",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        responses: {
          200: { description: "Paginated user list" },
        },
      },
    },
    "/api/v1/user/me": {
      get: {
        tags: ["Users"],
        summary: "Get the current user profile",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        responses: {
          200: { description: "Current user" },
        },
      },
    },
    "/api/v1/user/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get a single user by id",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "User found" },
          403: { description: "Forbidden" },
        },
      },
      patch: {
        tags: ["Users"],
        summary: "Update a user",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpdateUserRequest" },
            },
          },
        },
        responses: {
          200: { description: "User updated" },
        },
      },
    },
    "/api/v1/division": {
      get: {
        tags: ["Divisions"],
        summary: "Get all divisions",
        responses: {
          200: { description: "Division list" },
        },
      },
    },
    "/api/v1/division/create": {
      post: {
        tags: ["Divisions"],
        summary: "Create a division",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: { type: "string" },
                  thumbnail: { type: "string", format: "binary" },
                  description: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Division created" },
        },
      },
    },
    "/api/v1/division/{slug}": {
      get: {
        tags: ["Divisions"],
        summary: "Get a division by slug",
        parameters: [
          {
            name: "slug",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Division found" },
        },
      },
      patch: {
        tags: ["Divisions"],
        summary: "Update a division",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  thumbnail: { type: "string", format: "binary" },
                  description: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Division updated" },
        },
      },
      delete: {
        tags: ["Divisions"],
        summary: "Delete a division",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        responses: {
          200: { description: "Division deleted" },
        },
      },
    },
    "/api/v1/tour/tour-types": {
      get: {
        tags: ["Tours"],
        summary: "Get all tour types",
        responses: {
          200: { description: "Tour type list" },
        },
      },
    },
    "/api/v1/tour/create-tour-type": {
      post: {
        tags: ["Tours"],
        summary: "Create a tour type",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TourTypeRequest" },
            },
          },
        },
        responses: {
          201: { description: "Tour type created" },
        },
      },
    },
    "/api/v1/tour/tour-types/{id}": {
      patch: {
        tags: ["Tours"],
        summary: "Update a tour type",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TourTypeRequest" },
            },
          },
        },
        responses: {
          200: { description: "Tour type updated" },
        },
      },
      delete: {
        tags: ["Tours"],
        summary: "Delete a tour type",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        responses: {
          200: { description: "Tour type deleted" },
        },
      },
    },
    "/api/v1/tour": {
      get: {
        tags: ["Tours"],
        summary: "Get all tours",
        responses: {
          200: { description: "Tour list" },
        },
      },
    },
    "/api/v1/tour/create": {
      post: {
        tags: ["Tours"],
        summary: "Create a tour",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["title", "tourType", "division"],
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  location: { type: "string" },
                  costFrom: { type: "number" },
                  startDate: { type: "string" },
                  endDate: { type: "string" },
                  tourType: { type: "string" },
                  included: { type: "array", items: { type: "string" } },
                  excluded: { type: "array", items: { type: "string" } },
                  amenities: { type: "array", items: { type: "string" } },
                  tourPlan: { type: "array", items: { type: "string" } },
                  maxGuest: { type: "number" },
                  minAge: { type: "number" },
                  division: { type: "string" },
                  departureLocation: { type: "string" },
                  arrivalLocation: { type: "string" },
                  files: {
                    type: "array",
                    items: { type: "string", format: "binary" },
                  },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Tour created" },
        },
      },
    },
    "/api/v1/tour/{id}": {
      patch: {
        tags: ["Tours"],
        summary: "Update a tour",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/TourRequest",
              },
            },
          },
        },
        responses: {
          200: { description: "Tour updated" },
        },
      },
      delete: {
        tags: ["Tours"],
        summary: "Delete a tour",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        responses: {
          200: { description: "Tour deleted" },
        },
      },
    },
    "/api/v1/booking": {
      post: {
        tags: ["Bookings"],
        summary: "Create a booking",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BookingRequest" },
            },
          },
        },
        responses: {
          201: { description: "Booking created" },
        },
      },
      get: {
        tags: ["Bookings"],
        summary: "Get all bookings",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        responses: {
          200: { description: "Booking list" },
        },
      },
    },
    "/api/v1/booking/my-bookings": {
      get: {
        tags: ["Bookings"],
        summary: "Get bookings for the current user",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        responses: {
          200: { description: "Current user's bookings" },
        },
      },
    },
    "/api/v1/booking/{bookingId}": {
      get: {
        tags: ["Bookings"],
        summary: "Get a booking by id",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          {
            name: "bookingId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Booking found" },
        },
      },
    },
    "/api/v1/booking/{bookingId}/status": {
      patch: {
        tags: ["Bookings"],
        summary: "Update booking status",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          {
            name: "bookingId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BookingStatusRequest" },
            },
          },
        },
        responses: {
          200: { description: "Booking status updated" },
        },
      },
    },
    "/api/v1/payment/init-payment/{bookingId}": {
      post: {
        tags: ["Payments"],
        summary: "Initialize a payment session",
        parameters: [
          {
            name: "bookingId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Payment initialization data returned" },
        },
      },
    },
    "/api/v1/payment/success": {
      post: {
        tags: ["Payments"],
        summary: "Handle successful payment callback",
        responses: {
          200: { description: "Payment marked successful" },
        },
      },
    },
    "/api/v1/payment/fail": {
      post: {
        tags: ["Payments"],
        summary: "Handle failed payment callback",
        responses: {
          200: { description: "Payment marked failed" },
        },
      },
    },
    "/api/v1/payment/cancel": {
      post: {
        tags: ["Payments"],
        summary: "Handle cancelled payment callback",
        responses: {
          200: { description: "Payment marked cancelled" },
        },
      },
    },
    "/api/v1/payment/validate-payment": {
      post: {
        tags: ["Payments"],
        summary: "Validate payment information",
        responses: {
          200: { description: "Payment validated" },
        },
      },
    },
    "/api/v1/payment/invoice/{paymentId}": {
      get: {
        tags: ["Payments"],
        summary: "Get invoice download URL for a payment",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          {
            name: "paymentId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Invoice URL returned" },
        },
      },
    },
    "/api/v1/otp/send": {
      post: {
        tags: ["OTP"],
        summary: "Send an OTP to an email address",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OtpRequest" },
            },
          },
        },
        responses: {
          200: { description: "OTP sent" },
        },
      },
    },
    "/api/v1/otp/verify": {
      post: {
        tags: ["OTP"],
        summary: "Verify an OTP",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OtpVerifyRequest" },
            },
          },
        },
        responses: {
          200: { description: "OTP verified" },
        },
      },
    },
    "/api/v1/stats/booking": {
      get: {
        tags: ["Stats"],
        summary: "Get booking statistics",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        responses: {
          200: { description: "Booking stats" },
        },
      },
    },
    "/api/v1/stats/payment": {
      get: {
        tags: ["Stats"],
        summary: "Get payment statistics",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        responses: {
          200: { description: "Payment stats" },
        },
      },
    },
    "/api/v1/stats/user": {
      get: {
        tags: ["Stats"],
        summary: "Get user statistics",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        responses: {
          200: { description: "User stats" },
        },
      },
    },
    "/api/v1/stats/tour": {
      get: {
        tags: ["Stats"],
        summary: "Get tour statistics",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        responses: {
          200: { description: "Tour stats" },
        },
      },
    },
  },
} as const;
