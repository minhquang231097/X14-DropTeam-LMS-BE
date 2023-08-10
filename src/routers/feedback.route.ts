import feedbackController from "@/controllers/feedback.controller";
import express from "express";

const feedbackRouter = express.Router();

feedbackRouter.post("/", feedbackController.CreateNewFeekback);
feedbackRouter.put("/", feedbackController.UpdateFeedback);
feedbackRouter.get("/", feedbackController.GetFeedback);
feedbackRouter.delete("/", feedbackController.DeleteFeedback);

export default feedbackRouter;
