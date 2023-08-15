"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const response_config_1 = require("@/configs/response.config");
exports.AttendanceSchema = {
    Attendance: {
        create_attendance: joi_1.default.object({
            session: joi_1.default.string().required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NO_SESSION,
                'any.required': `{{#label}} is a required field`
            }),
            class: joi_1.default.string().required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NO_CLASS,
                'any.required': `{{#label}} is a required field`
            }),
            day: joi_1.default.number().integer().min(1).required().messages({
                'number.base': `{{#label}} must be a number`,
                'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
                'number.integer': `{{#label}} must be an integer `,
                'any.required': `{{#label}} is a required field`
            }),
            absence: joi_1.default.string().required(),
            class_size: joi_1.default.number().required(),
        }),
        update_attendance: joi_1.default.object({
            session: joi_1.default.string().required(),
            class: joi_1.default.string().required(),
            day: joi_1.default.number().required(),
            absence: joi_1.default.string().required(),
            class_size: joi_1.default.number().required(),
        }),
    }
};
//# sourceMappingURL=attendance.joi.js.map