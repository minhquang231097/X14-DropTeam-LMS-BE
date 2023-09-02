"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const response_config_1 = require("@/configs/response.config");
exports.LessonSchema = {
    Lesson: {
        create_lesson: joi_1.default.object({
            course_id: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.NO_SESSION} (import session code)`,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field (import session code)`,
            }),
            title: joi_1.default.string().required().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.NO_TITLE,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
            }),
            content: joi_1.default.string().required().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.NO_CONTENT,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
            }),
            no: joi_1.default.number().required().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.NO_NO,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
            }),
        }),
        update_lesson: joi_1.default.object({
            title: joi_1.default.string().required().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.NO_TITLE,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
            }),
            content: joi_1.default.string().required().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.NO_CONTENT,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
            }),
            no: joi_1.default.number().required().messages({
                "number.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.NO_NO,
                "number.base": `{{#label}} must be a number`,
                "number.min": `{{#label}} must greater than or equal to {{#limit}}`,
                "number.integer": `{{#label}} must be an integer `,
                "any.required": `{{#label}} is a required field`,
            }),
        }),
    },
};
//# sourceMappingURL=lesson.joi.js.map