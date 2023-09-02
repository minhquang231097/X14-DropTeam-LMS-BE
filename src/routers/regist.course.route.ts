import registCourseController from "@/controllers/regist.course.controller";
import { CheckRole } from "@/middlewares/checkRole";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";
import { RegistSchema } from "@/validation/regist.course.joi";
import { ValidateJoi } from "@/validation/validatejoi";
import express from "express";

const registCourseRouter = express.Router();

registCourseRouter.get("/",  registCourseController.GetRegist);
registCourseRouter.get("/:id",  registCourseController.GetRegistInfo);
registCourseRouter.post("/student", verifyAccessJWT,ValidateJoi(RegistSchema.Regist.student_regist_course),  registCourseController.RegistedNewCourseInStudent);
registCourseRouter.post("/admin", ValidateJoi(RegistSchema.Regist.admin_regist_course),  registCourseController.RegistedNewCourseInAdmin);
registCourseRouter.put("/:id", ValidateJoi(RegistSchema.Regist.update_regist_course), registCourseController.UpdateRegist);
registCourseRouter.delete("/:id",  registCourseController.DeleteRegist);

export default registCourseRouter;
