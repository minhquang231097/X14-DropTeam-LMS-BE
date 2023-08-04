import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser = require("body-parser");
import Cors from "cors";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(Cors({ origin: true, credentials: true }));

const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("Hello!");
});

import { connectDB } from "./common/connectDB";
connectDB();

//Routes
import userRouter from "./routers/user.route";
import workplaceRouter from "./routers/workplace.route";
import courseRouter from "./routers/course.route";
import classRouter from "./routers/class.route";
import sessionRouter from "./routers/session.route";
import regist_courseRouter from "./routers/regist.course.route";
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/workplace", workplaceRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/session", sessionRouter);
app.use("/api/vi/regist-course", regist_courseRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
