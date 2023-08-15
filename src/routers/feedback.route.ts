import feedbackController from "@/controllers/feedback.controller";
import { FeedbackSchema } from "@/validation/feedback.joi";
import { ValidateJoi } from "@/validation/validatejoi";
import express from "express";

const feedbackRouter = express.Router();

feedbackRouter.post("/", ValidateJoi(FeedbackSchema.Feedback.create_feedback), feedbackController.CreateNewFeekback);
feedbackRouter.put("/:id", ValidateJoi(FeedbackSchema.Feedback.update_feedback), feedbackController.UpdateFeedback);
feedbackRouter.get("/", feedbackController.GetFeedback);
feedbackRouter.delete("/:id", feedbackController.DeleteFeedback);

export default feedbackRouter;
