"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lesson_controller_1 = __importDefault(require("@/controllers/lesson.controller"));
const lesson_joi_1 = require("@/validation/lesson.joi");
const validatejoi_1 = require("@/validation/validatejoi");
const express_1 = __importDefault(require("express"));
const lessonRouter = express_1.default.Router();
lessonRouter.get("/", lesson_controller_1.default.GetLesson);
lessonRouter.post("/", (0, validatejoi_1.ValidateJoi)(lesson_joi_1.LessonSchema.Lesson.create_lesson), lesson_controller_1.default.CreateNewLesson);
lessonRouter.put("/", (0, validatejoi_1.ValidateJoi)(lesson_joi_1.LessonSchema.Lesson.update_lesson), lesson_controller_1.default.UpdateLesson);
lessonRouter.delete("/", lesson_controller_1.default.DeleteLesson);
exports.default = lessonRouter;
//# sourceMappingURL=lesson.route.js.map