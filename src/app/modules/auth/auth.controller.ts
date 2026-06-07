import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { setAuthCookie } from "../../utils/setCookie";

const credentialsLogin = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body);

    setAuthCookie(res, loginInfo);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged In Successfully",
      data: loginInfo,
    });
  },
);

const getNewAccessToken = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.headers.authorization;

    const tokenInfo = await AuthServices.getNewAccessToken(
      refreshToken as string,
    );
    setAuthCookie(res, tokenInfo);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "New Access Token Retrived Successfully",
      data: tokenInfo,
    });
  },
);

const logout = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged Out Successfully",
      data: null,
    });
  },
);

export const AuthControllers = {
  credentialsLogin,
  getNewAccessToken,
  logout,
};
