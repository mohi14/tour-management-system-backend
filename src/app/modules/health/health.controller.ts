import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import mongoose from "mongoose";
import { redisClient } from "../../config/redis.config";

const getLiveHealth = catchAsync(async (_req: Request, res: Response) => {
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service is alive",
    data: {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
  });
});

const getReadyHealth = catchAsync(async (_req: Request, res: Response) => {
  const mongoState = mongoose.connection.readyState;
  const redisState = redisClient.isOpen ? "connected" : "disconnected";
  const isReady = mongoState === 1 && redisState === "connected";

  sendResponse(res, {
    success: isReady,
    statusCode: isReady ? httpStatus.OK : httpStatus.SERVICE_UNAVAILABLE,
    message: isReady ? "Service is ready" : "Service is not ready",
    data: {
      status: isReady ? "ready" : "not_ready",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      dependencies: {
        mongo: {
          state: mongoState,
          status:
            mongoState === 1
              ? "connected"
              : mongoState === 2
                ? "connecting"
                : mongoState === 3
                  ? "disconnecting"
                  : "disconnected",
        },
        redis: {
          status: redisState,
        },
      },
    },
  });
});

export const HealthControllers = {
  getLiveHealth,
  getReadyHealth,
};
