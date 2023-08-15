import registCourseController from "@/controllers/regist.course.controller";
import { CheckRole } from "@/middlewares/checkRole";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";
import { RegistSchema } from "@/validation/regist.course.joi";
import { ValidateJoi } from "@/validation/validatejoi";
import express from "express";

const registCourseRouter = express.Router();

registCourseRouter.post("/", ValidateJoi(RegistSchema.Regist.regist_course), verifyAccessJWT, registCourseController.RegistedNewCourse,);
registCourseRouter.get("/", verifyAccessJWT, registCourseController.GetRegist);

registCourseRouter.put(
  "/:id",
  verifyAccessJWT,
  registCourseController.UpdateRegist,
);

registCourseRouter.delete(
  "/:id",
  verifyAccessJWT,
  registCourseController.DeleteRegist,
);

export default registCourseRouter;
