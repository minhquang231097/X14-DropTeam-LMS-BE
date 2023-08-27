"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
const joi_1 = __importDefault(require("joi"));
const response_config_1 = require("@/configs/response.config");
exports.Schema = {
    User: {
        sign_up: joi_1.default.object({
            fullname: joi_1.default.string().min(5).max(100).required().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NO_FULLNAME,
                "string.base": `{{#label}} should be type of text`,
                "string.min": `{{#label}} should have a minimum length of {#limit}`,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
            }),
            email: joi_1.default.string().email().min(5).max(100).required().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NO_EMAIL,
                "string.min": `{{#label}} should have a minimum length of {#limit}`,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
                "string.email": `{{#label} is not an email`
            }),
            phone_number: joi_1.default.string()
                .regex(/^[0-9]/)
                .min(5)
                .max(12)
                .required()
                .messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NO_PHONE_NUM,
                "string.pattern.base": `{{#label}} have to match the required pattern: 0-9`,
                "string.min": `{{#label}} should have a minimum length of {#limit}`,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
            }),
            username: joi_1.default.string().regex(/^[^\W_]+$/).min(5).max(100).required().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NO_USERNAME,
                "string.min": `{{#label}} should have a minimum length of {#limit}`,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
            }),
            password: joi_1.default.string().regex(/^(?!.* )[A-Za-zd$@$!%*?&.]/).min(5).max(100).required().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NO_PASSWORD,
                "string.min": `{{#label}} should have a minimum length of {#limit}`,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
            }),
            avatar: joi_1.default.string().optional(),
            create_at: joi_1.default.string().optional(),
            role: joi_1.default.string(),
            dob: joi_1.default.string().required(),
            gender: joi_1.default.string().required(),
            address: joi_1.default.string().required(),
        }),
        sign_in: joi_1.default.object({
            username: joi_1.default.string().min(5).max(100).required().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NO_USERNAME,
                "string.min": `{{#label}} should have a minimum length of {#limit}`,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
            }),
            password: joi_1.default.string().min(5).max(20).required().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NO_PASSWORD,
                "string.min": `{{#label}} should have a minimum length of {#limit}`,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
            }),
        }),
        sign_out: joi_1.default.object({
            id: joi_1.default.string().required().messages({
                "string.empty": `No id found`,
                "any.require": `No id found`,
            }),
        }),
        update: joi_1.default.object({
            email: joi_1.default.string().min(5).max(100).optional().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NO_EMAIL,
                "string.min": `{{#label}} should have a minimum length of {#limit}`,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
            }),
            fullname: joi_1.default.string().min(5).max(100).optional().messages({
                "string.base": `{{#label}} should be type of text`,
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NO_FULLNAME,
                "string.min": `{{#label}} should have a minimum length of {#limit}`,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
            }),
            phone_number: joi_1.default.string()
                .regex(/^[0-9]/)
                .min(5)
                .max(100)
                .optional()
                .messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NO_PHONE_NUM,
                "string.pattern.base": `{{#label}} have to match the required pattern: 0-9`,
                "string.min": `{{#label}} should have a minimum length of {#limit}`,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
            }),
            avatar: joi_1.default.string().optional(),
            dob: joi_1.default.string().optional(),
            gender: joi_1.default.string().optional(),
            address: joi_1.default.string().optional(),
        }),
        forgot_password: joi_1.default.object({
            email: joi_1.default.string().min(5).max(100).optional().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NO_EMAIL,
                "string.min": `{{#label}} should have a minimum length of {#limit}`,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
            }),
        }),
        new_password: joi_1.default.object({
            password: joi_1.default.string().min(5).max(100).required().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NO_PASSWORD,
                "string.min": `{{#label}} should have a minimum length of {#limit}`,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
            }),
        }),
        change_password: joi_1.default.object({
            password: joi_1.default.string().min(5).max(100).required().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NO_PASSWORD,
                "string.min": `{{#label}} should have a minimum length of {#limit}`,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
            }),
            newPassword: joi_1.default.string().min(5).max(100).required().messages({
                "string.empty": response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NO_PASSWORD,
                "string.min": `{{#label}} should have a minimum length of {#limit}`,
                "string.max": `{{#label}} should have a maximum length of {#limit}`,
                "any.required": `{{#label}} is a required field`,
            }),
        }),
    },
};
//# sourceMappingURL=user.joi.js.map