/* eslint-disable no-console */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";



// const createUserFunction = async (req: Response, res: Response) => {

//     const user = await UserServices.createUser(req.body)

//     res.status(httpStatus.CREATED).json({
//         message: "User Created Successfully",
//         user
//     })
// }

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         // throw new Error("Fake eror")
//         // throw new AppError(httpStatus.BAD_REQUEST, "fake error")

//         // createUserFunction(req, res)

//     } catch (err: any) {
//         console.log(err);
//         next(err)
//     }
// }

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserServices.createUser(req.body);
    res.status(httpStatus.CREATED).json({
      message: "User Created Successfully",
      user,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    next(error)
  }
};

export const UserControllers = {
  createUser,
};
