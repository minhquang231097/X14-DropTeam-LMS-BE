import courseController from "@/controllers/course.controller";
import express from "express";
import { ValidateJoi } from "@/validation/validatejoi";
import { CourseSchema } from "@/validation/course.joi";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";
import { UploadCloud } from "@/services/upload.service";

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
courseRouter.get("/all", courseController.GetAllCourse);
courseRouter.get("/", courseController.GetCourseById);
courseRouter.get("/", courseController.GetCourseByCode);
courseRouter.delete("/all", courseController.DeletedAllCourse);
courseRouter.delete("/", verifyAccessJWT, courseController.DeletedCourse);
courseRouter.post(
  "/upload-image",
  UploadCloud.any(),
  courseController.UploadImage,
);

export default courseRouter;
