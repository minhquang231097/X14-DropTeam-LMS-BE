import registCourseController from "@/controllers/regist.course.controller";
import { CheckRole } from "@/middlewares/checkRole";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";
import { RegistSchema } from "@/validation/regist.course.joi";
import { ValidateJoi } from "@/validation/validatejoi";
import express from "express";

const registCourseRouter = express.Router();

registCourseRouter.get("/", verifyAccessJWT, registCourseController.GetRegist);
registCourseRouter.get("/:id", verifyAccessJWT, registCourseController.GetRegistInfo);
registCourseRouter.post("/student", ValidateJoi(RegistSchema.Regist.regist_course), verifyAccessJWT, registCourseController.RegistedNewCourseInStudent);
registCourseRouter.post("/admin", ValidateJoi(RegistSchema.Regist.regist_course), verifyAccessJWT, registCourseController.RegistedNewCourseInAdmin);
registCourseRouter.put("/:id", ValidateJoi(RegistSchema.Regist.update_course), verifyAccessJWT, registCourseController.UpdateRegist);
registCourseRouter.delete("/:id", verifyAccessJWT, registCourseController.DeleteRegist);

export default registCourseRouter;
