"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedBack = void 0;
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = require("mongoose");
const feedbackSchema = new mongoose_1.Schema({
    course: { type: mongoose_1.Schema.Types.ObjectId, ref: "courses" },
    student: { type: mongoose_1.Schema.Types.ObjectId, ref: "students" },
    rating: String,
    content: String,
    create_at: { type: Date, default: Date.now() },
    formated_date: String,
});
feedbackSchema.pre("save", function (next) {
    this.formated_date = (0, moment_1.default)(this.create_at).format("DD/MM/YYYY");
    next();
});
exports.FeedBack = (0, mongoose_1.model)("feedbacks", feedbackSchema);
//# sourceMappingURL=feedback.model.js.map