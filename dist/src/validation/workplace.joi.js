"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkplaceSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const response_config_1 = require("@/configs/response.config");
exports.WorkplaceSchema = {
    Workplace: {
        create_workplace: joi_1.default.object({
            name: joi_1.default.string().max(100).required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NO_WORKPLACE,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
            address: joi_1.default.string().max(200).required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NO_ADDRESS,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
            status: joi_1.default.string().valid("ON", "OFF", "UPCOMING").required().messages({
                'any.only': `{{#labe}} must be ON, OFF or UPCOMING`,
            }),
            workplace_code: joi_1.default.string().max(5).required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NO_CODENAME,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
        }),
        update_workplace: joi_1.default.object({
            name: joi_1.default.string().max(100).required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NO_WORKPLACE,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
            address: joi_1.default.string().max(200).required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NO_ADDRESS,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
            status: joi_1.default.string().valid("ON", "OFF", "UPCOMING").required().messages({
                'any.only': `{{#labe}} must be ON, OFF or UPCOMING`,
                'any.required': `{{#label}} is a required field`
            }),
            workplace_code: joi_1.default.string().max(5).required().messages({
                'string.empty': response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NO_CODENAME,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
        }),
    },
};
//# sourceMappingURL=workplace.joi.js.map