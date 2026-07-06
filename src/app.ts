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
// import swaggerUi from "swagger-ui-express";
// import { swaggerSpec } from "./app/config/swagger";
import "./app/config/passport";

const app = express();
const viewsDirectory = path.join(process.cwd(), "src/app/utils/templates");

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

app.use("/api/v1", router);


app.set("view engine", "ejs");
app.set("views", viewsDirectory);
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
