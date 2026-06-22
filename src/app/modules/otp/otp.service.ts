import { redisClient } from "../../config/redis.config";
import AppError from "../../errorHelpers/AppError";
import { generateOtp } from "../../utils/generateOtp";
import { sendEmail } from "../../utils/sendEmail";
import { User } from "../user/user.model";
import httpsStatus from "http-status-codes";

const OTP_EXPIRATION = 2 * 60; // 2minute

const sendOTP = async (email: string, name: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpsStatus.NOT_FOUND, "User not found");
  }

  if (user.isVerified) {
    throw new AppError(httpsStatus.UNAUTHORIZED, "You are already verified");
  }
  const otp = generateOtp();

  const redisKey = `otp:${email}`;

  await redisClient.set(redisKey, otp, {
    expiration: {
      type: "EX",
      value: OTP_EXPIRATION,
    },
  });

  await sendEmail({
    to: email,
    subject: "Your OTP Code",
    templateName: "otp",
    templateData: {
      name: name,
      otp: otp,
    },
  });
};

export const OTPService = {
  sendOTP,
};
