import Joi from "joi";
import { IWorkplace } from "@/models/workplace.model";
import { UpdateWorkplaceDto } from "@/types/workplace";
import { RESPONSE_CONFIG } from "@/configs/response.config";

export const WorkplaceSchema = {
  Workplace: {
    create_workplace: Joi.object<IWorkplace>({
      name: Joi.string().max(100).required().messages({
        'string.empty': RESPONSE_CONFIG.MESSAGE.WORKPLACE.NO_WORKPLACE,
        'string.max': `{{#label}} should have a maximum length of {#limit}`,
        'any.required': `{{#label}} is a required field`
      }),
      address: Joi.string().max(200).required().messages({
        'string.empty': RESPONSE_CONFIG.MESSAGE.WORKPLACE.NO_ADDRESS,
        'string.max': `{{#label}} should have a maximum length of {#limit}`,
        'any.required': `{{#label}} is a required field`
      }),
      status: Joi.string().valid("ON", "OFF", "UPCOMING").required().messages({
        'any.only': `{{#labe}} must be ON, OFF or UPCOMING`,
      }),
      workplace_code: Joi.string().max(5).required().messages({
        'string.empty': RESPONSE_CONFIG.MESSAGE.WORKPLACE.NO_CODENAME,
        'string.max': `{{#label}} should have a maximum length of {#limit}`,
        'any.required': `{{#label}} is a required field`
      }),
    }),
    update_workplace: Joi.object<UpdateWorkplaceDto>({
      name: Joi.string().max(100).required().messages({
        'string.empty': RESPONSE_CONFIG.MESSAGE.WORKPLACE.NO_WORKPLACE,
        'string.max': `{{#label}} should have a maximum length of {#limit}`,
        'any.required': `{{#label}} is a required field`
      }),
      address: Joi.string().max(200).required().messages({
        'string.empty': RESPONSE_CONFIG.MESSAGE.WORKPLACE.NO_ADDRESS,
        'string.max': `{{#label}} should have a maximum length of {#limit}`,
        'any.required': `{{#label}} is a required field`
      }),
      status: Joi.string().valid("ON", "OFF", "UPCOMING").required().messages({
        'any.only': `{{#labe}} must be ON, OFF or UPCOMING`,
        'any.required': `{{#label}} is a required field`
      }),
      workplace_code: Joi.string().max(5).required().messages({
        'string.empty': RESPONSE_CONFIG.MESSAGE.WORKPLACE.NO_CODENAME,
        'string.max': `{{#label}} should have a maximum length of {#limit}`,
        'any.required': `{{#label}} is a required field`
      }),
    }),
  },
};
