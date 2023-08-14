"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.CourseSchema = {
    Course: {
        create_course: joi_1.default.object({
            course_code: joi_1.default.string().max(10).required(),
            title: joi_1.default.string().max(100).required(),
            image: joi_1.default.array().max(200),
            session_per_course: joi_1.default.number().min(1).integer().required(),
            price: joi_1.default.number().min(1).required(),
            desc: joi_1.default.string().max(500).required(),
            duration: joi_1.default.number().integer().min(0),
            level: joi_1.default.number().integer().min(0),
            rate: joi_1.default.number().min(0),
            discount: joi_1.default.number().integer().min(0),
        }),
        update_course: joi_1.default.object({
            course_code: joi_1.default.string().max(10).required(),
            title: joi_1.default.string().max(20).required(),
            image: joi_1.default.array().max(200),
            session_per_course: joi_1.default.number().required(),
            price: joi_1.default.number().max(10).required(),
            desc: joi_1.default.string().max(500).required(),
            duration: joi_1.default.number().integer().min(0),
            level: joi_1.default.number().integer().min(0),
            rate: joi_1.default.number().min(0),
            discount: joi_1.default.number().integer().min(0),
        }),
    },
};
//# sourceMappingURL=course.joi.js.map