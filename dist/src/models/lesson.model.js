"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = void 0;
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = require("mongoose");
const lessonSchema = new mongoose_1.Schema({
    session: { type: mongoose_1.Schema.Types.ObjectId, ref: "sessions" },
    title: String,
    content: String,
    no: Number,
    create_at: {
        type: Date,
        default: Date.now(),
    },
    formated_date: String,
});
lessonSchema.pre("save", function (next) {
    this.formated_date = (0, moment_1.default)(this.create_at).format("DD/MM/YYYY");
    next();
});
exports.Lesson = (0, mongoose_1.model)("lessons", lessonSchema);
//# sourceMappingURL=lesson.model.js.map