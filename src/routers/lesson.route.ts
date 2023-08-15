import lessonController from "@/controllers/lesson.controller";
import express from "express";

const lessonRouter = express.Router();

lessonRouter.get("/", lessonController.GetLesson);
lessonRouter.post("/", lessonController.CreateNewLesson);
lessonRouter.put("/:id", lessonController.UpdateLesson);
lessonRouter.delete("/:id", lessonController.DeleteLesson);

export default lessonRouter;
