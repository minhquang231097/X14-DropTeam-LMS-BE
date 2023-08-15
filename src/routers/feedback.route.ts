import feedbackController from "@/controllers/feedback.controller";
import express from "express";

const feedbackRouter = express.Router();

feedbackRouter.post("/", feedbackController.CreateNewFeekback);
feedbackRouter.put("/:id", feedbackController.UpdateFeedback);
feedbackRouter.get("/", feedbackController.GetFeedback);
feedbackRouter.delete("/:id", feedbackController.DeleteFeedback);

export default feedbackRouter;
