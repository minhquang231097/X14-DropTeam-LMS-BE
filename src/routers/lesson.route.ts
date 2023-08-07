import lessonController from "@/controllers/lesson.controller";
import express from "express";

const lessonRouter = express.Router();

lessonRouter.get("/", lessonController.GetLesson);
lessonRouter.post("/", lessonController.CreateNewLesson);
lessonRouter.put("/", lessonController.UpdateLesson);
lessonRouter.delete("/", lessonController.DeleteLesson);

export default lessonRouter;
