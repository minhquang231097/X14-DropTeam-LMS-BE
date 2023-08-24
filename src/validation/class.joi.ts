import { IClass } from "@/models/class.model";
import Joi from "joi";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import { AddStudentToClassDto, CreateClassDto, UpdateClassDto } from "@/types/class";

export const ClassSchema = {
  Class: {
    create_class: Joi.object<CreateClassDto>({
      mentor_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.CLASS.NO_MENTOR} (import mentor)`,
          "any.required": `{{#label}} is a required field`,
        }),
      workplace_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.CLASS.NO_WORKPLACE} (import workplace)`,
          "any.required": `{{#label}} is a required field`,
        }),
      course_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.CLASS.NO_COURSE} (import course)`,
          "any.required": `{{#label}} is a required field`,
        }),
      start_at: Joi.date().min(new Date().toISOString().split('T')[0]).required().messages({
        "date.min": `{{#label}} must greater than or equal to now`,
        "string.empty": RESPONSE_CONFIG.MESSAGE.CLASS.NO_START_DATE,
        "any.required": `{{#label}} is a required field`,
      }),
      end_at: Joi.string().optional(),
      schedule: Joi.array().items(Joi.number().integer().min(0).max(6)).unique().required().messages({
        "array.empty": RESPONSE_CONFIG.MESSAGE.CLASS.NO_SCHEDULE,
        "any.required": `{{#label}} is a required field`,
        "array.unique": "Schedule item must be unique",
      }),
      total_session: Joi.number().integer().min(1).required().messages({
        "number.empty": RESPONSE_CONFIG.MESSAGE.CLASS.NO_TOTAL_SESSION,
        "any.required": `{{#label}} is a required field`,
        "number.min": `{{#label}} must greater than or equal to {{#limit}}`,
        "number.base": `{{#label}} must be a number`,
        "number.integer": `{{#label}} must be an integer `,
      }),
      class_size: Joi.number().integer().min(1).required().messages({
        "number.empty": RESPONSE_CONFIG.MESSAGE.CLASS.NO_SIZE,
        "any.required": `{{#label}} is a required field`,
        "number.min": `{{#label}} must greater than or equal to {{#limit}}`,
        "number.base": `{{#label}} must be a number`,
        "number.integer": `{{#label}} must be an integer `,
      }),
    }),

    add_student: Joi.object({
      list: Joi.array().items(
        Joi.object<AddStudentToClassDto>({
          student_id: Joi.string().required().messages({
            'string.empty': 'student_id is required',
            'any.required': 'student_id is a required field',
          }),
          class_id: Joi.string().required().messages({
            'string.empty': 'class_id is required',
            'any.required': 'class_id is a required field',
          }),
        })
      ),
    }),
    update_class: Joi.object<UpdateClassDto>({
      mentor_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.CLASS.NO_MENTOR} (import mentor_id)`,
          "any.required": `{{#label}} is a required field `,
        }),
      workplace_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.CLASS.NO_WORKPLACE} (import workplace_id)`,
          "any.required": `{{#label}} is a required field `,
        }),
      course_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.CLASS.NO_COURSE} (import course_id)`,
          "any.required": `{{#label}} is a required field`,
        }),
      start_at: Joi.date().min(new Date().toISOString().split('T')[0]).required().messages({
        "date.min": `{{#label}} must greater than or equal to now`,
        "string.empty": RESPONSE_CONFIG.MESSAGE.CLASS.NO_START_DATE,
        "any.required": `{{#label}} is a required field`,
      }),
      end_at: Joi.date().min(Joi.ref('start_at')).required().messages({
        "date.min": `{{#label}} must greater than or equal to start_at`,
        "string.empty": RESPONSE_CONFIG.MESSAGE.CLASS.NO_END_DATE,
        "any.required": `{{#label}} is a required field`,
      }),
      schedule: Joi.array().items(Joi.number().integer().min(0).max(6)).unique().required().messages({
        "array.empty": RESPONSE_CONFIG.MESSAGE.CLASS.NO_SCHEDULE,
        "any.required": `{{#label}} is a required field`,
        "array.unique": "Schedule item must be unique",
      }),
      class_size: Joi.number().integer().min(1).required().messages({
        "number.empty": RESPONSE_CONFIG.MESSAGE.CLASS.NO_SIZE,
        "any.required": `{{#label}} is a required field`,
        "number.min": `{{#label}} must greater than or equal to {{#limit}}`,
        "number.base": `{{#label}} must be a number`,
        "number.integer": `{{#label}} must be an integer `,
      }),
    }),
  },
};
