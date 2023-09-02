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
        admin_regist_course: joi_1.default.object({
            course_id: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import course id)`,
            }),
            workplace_id: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import workplace id)`,
            }),
            student_id: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import workplace id)`,
            }),
            note: joi_1.default.string().min(0),
        }),
        student_regist_course: joi_1.default.object({
            course_id: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import course id)`,
                "any.required": `{{#label}} is a required field`,
            }),
            workplace_id: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import workplace id)`,
                "any.required": `{{#label}} is a required field`,
            }),
            note: joi_1.default.string().min(0),
        }),
        update_regist_course: joi_1.default.object({
            course: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import course id)`,
                "any.required": `{{#label}} is a required field`,
            }),
            workplace: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import workplace id)`,
                "any.required": `{{#label}} is a required field`,
            }),
            note: joi_1.default.string().optional().min(0),
        }),
    },
};
//# sourceMappingURL=regist.course.joi.js.map