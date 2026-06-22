"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const handleDuplicateError_1 = require("../helpers/handleDuplicateError");
const handleCastError_1 = require("../helpers/handleCastError");
const handlerValidationError_1 = require("../helpers/handlerValidationError");
const handlerZodError_1 = require("../helpers/handlerZodError");
const cloudinary_config_1 = require("../config/cloudinary.config");
const globalErrorHandler = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
error, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => __awaiter(void 0, void 0, void 0, function* () {
    if (env_1.envVars.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log(error);
    }
    //if any error happened during file upload, file will be deleted from the cloudinary 
    if (req.file) {
        yield (0, cloudinary_config_1.deleteImageFromCLoudinary)(req.file.path);
    }
    if (req.files && Array.isArray(req.files) && req.files.length) {
        const imageUrls = req.files.map((file) => file.path);
        yield Promise.all(imageUrls.map((url) => (0, cloudinary_config_1.deleteImageFromCLoudinary)(url)));
    }
    let errorSources = [];
    let statusCode = 500;
    let message = "Something Went Wrong!!";
    //Duplicate error
    if (error.code === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.handlerDuplicateError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    // Object ID error / Cast Error
    else if (error.name === "CastError") {
        const simplifiedError = (0, handleCastError_1.handleCastError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    // Zod Error
    else if (error.name === "ZodError") {
        const simplifiedError = (0, handlerZodError_1.handlerZodError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    //Mongoose Validation Error
    else if (error.name === "ValidationError") {
        const simplifiedError = (0, handlerValidationError_1.handlerValidationError)(error);
        statusCode = simplifiedError.statusCode;
        errorSources = simplifiedError.errorSources;
        message = simplifiedError.message;
    }
    else if (error instanceof AppError_1.default) {
        statusCode = error.statusCode;
        message = error.message;
    }
    else if (error instanceof Error) {
        statusCode = 500;
        message = error.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        error: env_1.envVars.NODE_ENV === "development" ? error : null,
        stack: env_1.envVars.NODE_ENV === "development" ? error.stack : null,
    });
});
exports.globalErrorHandler = globalErrorHandler;
