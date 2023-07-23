import courseController from "@/controllers/course.controller";
import express from "express";
import { ValidateJoi } from "@/validation/validatejoi";
import { CourseSchema } from "@/validation/course.joi";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";

const courseRouter = express.Router()

courseRouter.post("/create-course", verifyAccessJWT, ValidateJoi(CourseSchema.Course.create_course), courseController.CreateCourse)
courseRouter.put("/course/:id", verifyAccessJWT, ValidateJoi(CourseSchema.Course.update_course), courseController.UpdateCourse)
courseRouter.get("/course", courseController.GetAllCourse)
courseRouter.get("/course/:id", courseController.GetCourseById)
courseRouter.delete("/course/:id", verifyAccessJWT, courseController.DeletedCourse)

export default courseRouter