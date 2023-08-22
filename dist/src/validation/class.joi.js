"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const response_config_1 = require("@/configs/response.config");
exports.ClassSchema = {
    Class: {
        create_class: joi_1.default.object({
            mentor_id: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_MENTOR} (import mentor)`,
                "any.required": `{{#label}} is a required field`,
            }),
            workplace_id: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_WORKPLACE} (import workplace)`,
                "any.required": `{{#label}} is a required field`,
            }),
            course_id: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_COURSE} (import course)`,
                "any.required": `{{#label}} is a required field`,
            }),
            start_at: joi_1.default.date().min(new Date().toISOString().split('T')[0]).required().messages({
                "date.min": `{{#label}} must greater than or equal to now`,
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_START_DATE,
                "any.required": `{{#label}} is a required field`,
            }),
            end_at: joi_1.default.string().optional(),
            schedule: joi_1.default.array().items(joi_1.default.number().integer().min(0).max(6)).unique().required().messages({
                "array.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_SCHEDULE,
                "any.required": `{{#label}} is a required field`,
                "array.unique": "Schedule item must be unique",
            }),
            total_session: joi_1.default.number().integer().min(1).required().messages({
                "number.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_TOTAL_SESSION,
                "any.required": `{{#label}} is a required field`,
                "number.min": `{{#label}} must greater than or equal to {{#limit}}`,
                "number.base": `{{#label}} must be a number`,
                "number.integer": `{{#label}} must be an integer `,
            }),
            class_size: joi_1.default.number().integer().min(1).required().messages({
                "number.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_SIZE,
                "any.required": `{{#label}} is a required field`,
                "number.min": `{{#label}} must greater than or equal to {{#limit}}`,
                "number.base": `{{#label}} must be a number`,
                "number.integer": `{{#label}} must be an integer `,
            }),
        }),
        add_student: joi_1.default.object({
            list: joi_1.default.array().items(joi_1.default.object({
                student_id: joi_1.default.string().required().messages({
                    'string.empty': 'student_id is required',
                    'any.required': 'student_id is a required field',
                }),
                class_id: joi_1.default.string().required().messages({
                    'string.empty': 'class_id is required',
                    'any.required': 'class_id is a required field',
                }),
            })),
        }),
        update_class: joi_1.default.object({
            mentor_id: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_MENTOR} (import mentor_id)`,
                "any.required": `{{#label}} is a required field `,
            }),
            workplace_id: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_WORKPLACE} (import workplace_id)`,
                "any.required": `{{#label}} is a required field `,
            }),
            course_id: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_COURSE} (import course_id)`,
                "any.required": `{{#label}} is a required field`,
            }),
            start_at: joi_1.default.date().min(new Date().toISOString().split('T')[0]).required().messages({
                "date.min": `{{#label}} must greater than or equal to now`,
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_START_DATE,
                "any.required": `{{#label}} is a required field`,
            }),
            end_at: joi_1.default.date().min(joi_1.default.ref('start_at')).required().messages({
                "date.min": `{{#label}} must greater than or equal to start_at`,
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_END_DATE,
                "any.required": `{{#label}} is a required field`,
            }),
            schedule: joi_1.default.array().items(joi_1.default.number().integer().min(0).max(6)).unique().required().messages({
                "array.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_SCHEDULE,
                "any.required": `{{#label}} is a required field`,
                "array.unique": "Schedule item must be unique",
            }),
            class_size: joi_1.default.number().integer().min(1).required().messages({
                "number.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_SIZE,
                "any.required": `{{#label}} is a required field`,
                "number.min": `{{#label}} must greater than or equal to {{#limit}}`,
                "number.base": `{{#label}} must be a number`,
                "number.integer": `{{#label}} must be an integer `,
            }),
        }),
    },
};
//# sourceMappingURL=class.joi.js.map