"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const response_config_1 = require("@/configs/response.config");
exports.SessionSchema = {
    Session: {
        create_session: joi_1.default.object({
            course: joi_1.default.string().required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.SESSION.NO_COURSE,
                'any.required': `{{#label}} is a required field`
            }),
            class: joi_1.default.string().required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.SESSION.NO_COURSE,
                'any.required': `{{#label}} is a required field`
            }),
            session_code: joi_1.default.string().required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.SESSION.NO_CODE,
                'any.required': `{{#label}} is a required field`
            }),
            session_name: joi_1.default.string().required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.SESSION.NO_NAME,
                'any.required': `{{#label}} is a required field`
            }),
            desc: joi_1.default.string().required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.SESSION.NO_DES,
                'any.required': `{{#label}} is a required field`
            }),
            status: joi_1.default.string().valid("COMPLETE", "UPCOMPLETE").required().messages({
                'any.only': `{{#labe}} must be COMPLETE or UPCOMPLETE`,
            })
        }),
        update_session: joi_1.default.object({
            course: joi_1.default.string().required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.SESSION.NO_COURSE,
                'any.required': `{{#label}} is a required field`
            }),
            class: joi_1.default.string().required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.SESSION.NO_COURSE,
                'any.required': `{{#label}} is a required field`
            }),
            session_code: joi_1.default.string().required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.SESSION.NO_CODE,
                'any.required': `{{#label}} is a required field`
            }),
            session_name: joi_1.default.string().required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.SESSION.NO_NAME,
                'any.required': `{{#label}} is a required field`
            }),
            desc: joi_1.default.string().required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.SESSION.NO_DES,
                'any.required': `{{#label}} is a required field`
            }),
            status: joi_1.default.string().valid("COMPLETE", "UPCOMPLETE").required().messages({
                'any.only': `{{#labe}} must be COMPLETE or UPCOMPLETE`,
            })
        }),
    }
};
//# sourceMappingURL=session.joi.js.map