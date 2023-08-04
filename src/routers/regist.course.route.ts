import registCourseController from "@/controllers/regist.course.controller";
import { CheckRole } from "@/middlewares/checkRole";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";
import express from "express";

const regist_courseRouter = express.Router();

regist_courseRouter.post(
  "/",
  verifyAccessJWT,
  CheckRole.IsStudent,
  registCourseController.RegistedNewCourse,
);

export default regist_courseRouter;
