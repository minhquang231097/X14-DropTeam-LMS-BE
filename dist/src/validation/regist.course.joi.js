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
            fullname: joi_1.default.string().min(5).max(100).required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NO_FULLNAME,
                'string.base': `{{#label}} should be type of text`,
                'string.min': `{{#label}} should have a minimum length of {#limit}`,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
            email: joi_1.default.string().required(),
            phone_number: joi_1.default.string().regex(/^[0-9]/).min(5).max(100).required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NO_PHONE_NUM,
                'string.pattern.base': `{{#label}} have to match the required pattern: 0-9`,
                'string.min': `{{#label}} should have a minimum length of {#limit}`,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
            course: joi_1.default.string().required().messages({
                'string.empty': `${response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import course code)`,
                'any.required': `{{#label}} is a required field`
            }),
            workplace: joi_1.default.string().required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NO_WORKPLACE,
                'any.required': `{{#label}} is a required field`
            }),
            note: joi_1.default.string(),
            student: joi_1.default.string().required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NO_STUDENT,
                'any.required': `{{#label}} is a required field`
            }),
        }),
    }
};
//# sourceMappingURL=regist.course.joi.js.map