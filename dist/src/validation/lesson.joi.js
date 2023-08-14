"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.LessonSchema = {
    Lesson: {
        create_lesson: joi_1.default.object({
            session: joi_1.default.string().required(),
            title: joi_1.default.string().required(),
            content: joi_1.default.string().required(),
            no: joi_1.default.number().required(),
        }),
        update_lesson: joi_1.default.object({
            session: joi_1.default.string().required(),
            title: joi_1.default.string().required(),
            content: joi_1.default.string().required(),
            no: joi_1.default.number().required(),
        }),
    }
};
//# sourceMappingURL=lesson.joi.js.map