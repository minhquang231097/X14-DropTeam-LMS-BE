import courseController from "@/controllers/course.controller";
import express from "express";
import { ValidateJoi } from "@/validation/validatejoi";
import { CourseSchema } from "@/validation/course.joi";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";

const courseRouter = express.Router()

courseRouter.post("/", verifyAccessJWT, ValidateJoi(CourseSchema.Course.create_course), courseController.CreateCourse)
courseRouter.put("/:id", verifyAccessJWT, ValidateJoi(CourseSchema.Course.update_course), courseController.UpdateCourse)
courseRouter.get("/", courseController.GetAllCourse)
courseRouter.get("/:id", courseController.GetCourseById)
courseRouter.delete("/:id", verifyAccessJWT, courseController.DeletedCourse)

export default courseRouter