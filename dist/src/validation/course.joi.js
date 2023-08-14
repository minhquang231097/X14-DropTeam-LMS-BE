"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const response_config_1 = require("@/configs/response.config");
exports.CourseSchema = {
    Course: {
        create_course: joi_1.default.object({
            course_code: joi_1.default.string().max(10).required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.NO_CODE,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
            title: joi_1.default.string().max(100).required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.NO_TITLE,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
            image: joi_1.default.array().max(200).messages({
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
            }),
            session_per_course: joi_1.default.number().min(1).integer().required().messages({
                'number.base': `{{#label}} must be a number`,
                'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
                'number.integer': `{{#label}} must be an integer `,
                'any.required': `{{#label}} is a required field`
            }),
            price: joi_1.default.number().min(1).required().messages({
                'number.base': `{{#label}} must be a number`,
                'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
                'number.integer': `{{#label}} must be an integer `,
                'any.required': `{{#label}} is a required field`
            }),
            desc: joi_1.default.string().max(500).required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.NO_DESCRIPTION,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
            duration: joi_1.default.number().integer().min(0).messages({
                'number.base': `{{#label}} must be a number`,
                'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
                'number.integer': `{{#label}} must be an integer `,
            }),
            level: joi_1.default.number().integer().min(0).messages({
                'number.base': `{{#label}} must be a number`,
                'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
                'number.integer': `{{#label}} must be an integer `,
            }),
            rate: joi_1.default.number().min(0).messages({
                'number.base': `{{#label}} must be a number`,
                'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
            }),
            discount: joi_1.default.number().integer().min(0).messages({
                'number.base': `{{#label}} must be a number`,
                'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
                'number.integer': `{{#label}} must be an integer `,
            }),
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