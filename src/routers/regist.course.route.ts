import registCourseController from "@/controllers/regist.course.controller";
import { CheckRole } from "@/middlewares/checkRole";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";
import express from "express";

const registCourseRouter = express.Router();

registCourseRouter.post(
  "/",
  verifyAccessJWT,
  registCourseController.RegistedNewCourse,
);

registCourseRouter.get("/", verifyAccessJWT, registCourseController.GetRegist);

registCourseRouter.put(
  "/",
  verifyAccessJWT,
  registCourseController.UpdateRegist,
);

registCourseRouter.delete(
  "/",
  verifyAccessJWT,
  registCourseController.DeleteRegist,
);

export default registCourseRouter;
