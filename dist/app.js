"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./app/routes");
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const env_1 = require("./app/config/env");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
// import swaggerUi from "swagger-ui-express";
// import { swaggerSpec } from "./app/config/swagger";
require("./app/config/passport");
const app = (0, express_1.default)();
const viewsDirectory = path_1.default.join(process.cwd(), "src/app/utils/templates");
app.use((0, express_session_1.default)({
    secret: env_1.envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.set("trust proxy", 1);
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: env_1.envVars.FRONTEND_URL,
    credentials: true
}));
// const enableSwaggerDocs =
//   envVars.NODE_ENV !== "production" || process.env.ENABLE_SWAGGER === "true";
// app.get("/api-docs.json", (_req, res) => {
//   res.json(swaggerSpec);
// });
// if (enableSwaggerDocs) {
//   app.use(
//     "/api-docs",
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerSpec, {
//       explorer: true,
//     }),
//   );
// }
app.use("/api/v1", routes_1.router);
app.set("view engine", "ejs");
app.set("views", viewsDirectory);
// app.get("/", (req: Request, res: Response) => {
//   res.status(200).json({
//     message: "Welcome to Tour Management System Backend",
//   });
// });
app.get("/", (req, res) => {
    res.render("home");
});
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;
