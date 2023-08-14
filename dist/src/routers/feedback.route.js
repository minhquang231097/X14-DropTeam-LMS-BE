"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feedback_controller_1 = __importDefault(require("@/controllers/feedback.controller"));
const feedback_joi_1 = require("@/validation/feedback.joi");
const validatejoi_1 = require("@/validation/validatejoi");
const express_1 = __importDefault(require("express"));
const feedbackRouter = express_1.default.Router();
feedbackRouter.post("/", (0, validatejoi_1.ValidateJoi)(feedback_joi_1.FeedbackSchema.Feedback.create_feedback), feedback_controller_1.default.CreateNewFeekback);
feedbackRouter.put("/", (0, validatejoi_1.ValidateJoi)(feedback_joi_1.FeedbackSchema.Feedback.update_feedback), feedback_controller_1.default.UpdateFeedback);
feedbackRouter.get("/", feedback_controller_1.default.GetFeedback);
feedbackRouter.delete("/", feedback_controller_1.default.DeleteFeedback);
exports.default = feedbackRouter;
//# sourceMappingURL=feedback.route.js.map