"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.FeedbackSchema = {
    Feedback: {
        create_feedback: joi_1.default.object({
            course: joi_1.default.string().required(),
            student: joi_1.default.string().required(),
            rating: joi_1.default.string().required(),
            content: joi_1.default.string().required(),
        }),
        update_feedback: joi_1.default.object({
            course: joi_1.default.string().required(),
            student: joi_1.default.string().required(),
            rating: joi_1.default.string().required(),
            content: joi_1.default.string().required(),
        }),
    }
};
//# sourceMappingURL=feedback.joi.js.map