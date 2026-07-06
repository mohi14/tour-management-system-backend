import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { envVars } from "./app/config/env";
import expressSession from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import path from "path";
import "./app/config/passport";

const app = express();

app.use(expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

app.use(express.json());
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: envVars.FRONTEND_URL,
    credentials: true
}))

app.use("/api/v1", router);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app/utils/templates"));
// app.get("/", (req: Request, res: Response) => {
//   res.status(200).json({
//     message: "Welcome to Tour Management System Backend",
//   });
// });

app.get("/", (req: Request, res: Response) => {
  res.render("home");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;