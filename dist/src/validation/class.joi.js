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
            mentor: joi_1.default.string().required().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_MENTOR,
                "any.required": `{{#label}} is a required field`,
            }),
            workplace: joi_1.default.string().required().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_WORKPLACE,
                "any.required": `{{#label}} is a required field`,
            }),
            course: joi_1.default.string().required().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_COURSE,
                "any.required": `{{#label}} is a required field`,
            }),
            class_code: joi_1.default.string().max(10).required().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_CODE,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
            }),
            start_at: joi_1.default.date().required().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_START_DATE,
                "any.required": `{{#label}} is a required field`,
            }),
            end_at: joi_1.default.string().optional(),
            schedule: joi_1.default.array().required().messages({
                "array.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_SCHEDULE,
                "any.required": `{{#label}} is a required field`,
            }),
            total_session: joi_1.default.number().integer().required().messages({
                "number.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_TOTAL_SESSION,
                "any.required": `{{#label}} is a required field`,
                "number.base": `{{#label}} must be a number`,
                "number.integer": `{{#label}} must be an integer `,
            }),
            class_size: joi_1.default.number().integer().required().messages({
                "number.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NO_SIZE,
                "any.required": `{{#label}} is a required field`,
                "number.base": `{{#label}} must be a number`,
                "number.integer": `{{#label}} must be an integer `,
            }),
        }),
    },
};
//# sourceMappingURL=class.joi.js.map