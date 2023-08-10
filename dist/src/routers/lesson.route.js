"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lesson_controller_1 = __importDefault(require("@/controllers/lesson.controller"));
const express_1 = __importDefault(require("express"));
const lessonRouter = express_1.default.Router();
lessonRouter.get("/", lesson_controller_1.default.GetLesson);
lessonRouter.post("/", lesson_controller_1.default.CreateNewLesson);
lessonRouter.put("/", lesson_controller_1.default.UpdateLesson);
lessonRouter.delete("/", lesson_controller_1.default.DeleteLesson);
exports.default = lessonRouter;
//# sourceMappingURL=lesson.route.js.map