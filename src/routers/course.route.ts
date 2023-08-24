import courseController from "@/controllers/course.controller";
import express from "express";
import { ValidateJoi } from "@/validation/validatejoi";
import { CourseSchema } from "@/validation/course.joi";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";

const courseRouter = express.Router();

courseRouter.get("/", courseController.GetCourse);
courseRouter.get("/:id", courseController.GetCourseInfo);
courseRouter.post(
  "/",
  verifyAccessJWT,
  ValidateJoi(CourseSchema.Course.create_course),
  courseController.CreateCourse,
);
courseRouter.put("/:id", verifyAccessJWT, ValidateJoi(CourseSchema.Course.update_course), courseController.UpdateCourse);
courseRouter.delete("/:id", verifyAccessJWT, courseController.DeletedCourse);

export default courseRouter;
