import courseController from "@/controllers/course.controller";
import express from "express";
import { ValidateJoi } from "@/validation/validatejoi";
import { CourseSchema } from "@/validation/course.joi";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";

const courseRouter = express.Router();

courseRouter.post(
  "/",
  verifyAccessJWT,
  ValidateJoi(CourseSchema.Course.create_course),
  courseController.CreateCourse,
);
courseRouter.put(
  "/",
  verifyAccessJWT,
  ValidateJoi(CourseSchema.Course.update_course),
  courseController.UpdateCourse,
);
courseRouter.get("/", courseController.GetCourse);
courseRouter.get("/search", courseController.SearchCourse);
courseRouter.delete("/all", courseController.DeletedAllCourse);
courseRouter.delete("/", verifyAccessJWT, courseController.DeletedCourse);

export default courseRouter;
