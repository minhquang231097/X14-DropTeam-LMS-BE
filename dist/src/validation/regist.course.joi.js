"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const response_config_1 = require("@/configs/response.config");
exports.RegistSchema = {
    Regist: {
        regist_course: joi_1.default.object({
            course_id: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import course code)`,
                "any.required": `{{#label}} is a required field`,
            }),
            workplace_id: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import workplace code)`,
                "any.required": `{{#label}} is a required field`,
            }),
            student_id: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import workplace code)`,
                "any.required": `{{#label}} is a required field`,
            }),
            note: joi_1.default.string(),
        }),
        update_course: joi_1.default.object({
            course_id: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import course code)`,
                "any.required": `{{#label}} is a required field`,
            }),
            workplace_id: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import workplace code)`,
                "any.required": `{{#label}} is a required field`,
            }),
            note: joi_1.default.string(),
        }),
    },
};
//# sourceMappingURL=regist.course.joi.js.map