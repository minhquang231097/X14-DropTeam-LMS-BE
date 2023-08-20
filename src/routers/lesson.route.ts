import lessonController from "@/controllers/lesson.controller";
import { LessonSchema } from "@/validation/lesson.joi";
import { ValidateJoi } from "@/validation/validatejoi";

import express from "express";

const lessonRouter = express.Router();

lessonRouter.get("/", lessonController.GetLesson);
lessonRouter.get("/:id", lessonController.GetLessonInfo);
lessonRouter.post("/", ValidateJoi(LessonSchema.Lesson.create_lesson), lessonController.CreateNewLesson);
lessonRouter.put("/:id", ValidateJoi(LessonSchema.Lesson.update_lesson), lessonController.UpdateLesson);
lessonRouter.delete("/:id", lessonController.DeleteLesson);

export default lessonRouter;
