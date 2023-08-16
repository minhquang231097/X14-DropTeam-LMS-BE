import { IClass } from "@/models/class.model";
import Joi from "joi";
import { RESPONSE_CONFIG } from "@/configs/response.config";

export const ClassSchema = {
  Class: {
    create_class: Joi.object<IClass>({
      mentor: Joi.string().required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.CLASS.NO_MENTOR,
        "any.required": `{{#label}} is a required field`,
      }),
      workplace: Joi.string().required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.CLASS.NO_WORKPLACE,
        "any.required": `{{#label}} is a required field`,
      }),
      course: Joi.string().required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.CLASS.NO_COURSE,
        "any.required": `{{#label}} is a required field`,
      }),
      class_code: Joi.string().max(10).required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.CLASS.NO_CODE,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
      start_at: Joi.date().required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.CLASS.NO_START_DATE,
        "any.required": `{{#label}} is a required field`,
      }),
      end_at: Joi.string().optional(),
      schedule: Joi.array().required().messages({
        "array.empty": RESPONSE_CONFIG.MESSAGE.CLASS.NO_SCHEDULE,
        "any.required": `{{#label}} is a required field`,
      }),
      total_session: Joi.number().integer().required().messages({
        "number.empty": RESPONSE_CONFIG.MESSAGE.CLASS.NO_TOTAL_SESSION,
        "any.required": `{{#label}} is a required field`,
        "number.base": `{{#label}} must be a number`,
        "number.integer": `{{#label}} must be an integer `,
      }),
      class_size: Joi.number().integer().required().messages({
        "number.empty": RESPONSE_CONFIG.MESSAGE.CLASS.NO_SIZE,
        "any.required": `{{#label}} is a required field`,
        "number.base": `{{#label}} must be a number`,
        "number.integer": `{{#label}} must be an integer `,
      }),
    }),
  },
};
