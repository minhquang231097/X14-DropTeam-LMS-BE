import Joi from "joi";
import { ICourse } from "@/models/course.model";
import { CreateCourseDto, UpdateCourseDto } from "@/types/course";
import { RESPONSE_CONFIG } from "@/configs/response.config";

export const CourseSchema = {
  Course: {
    create_course: Joi.object<CreateCourseDto>({
      course_code: Joi.string().max(10).required().messages({
        'string.empty': RESPONSE_CONFIG.MESSAGE.COURSE.NO_CODE,
        'string.max': `{{#label}} should have a maximum length of {#limit}`,
        'any.required': `{{#label}} is a required field`
      }),
      title: Joi.string().max(100).required().messages({
        'string.empty': RESPONSE_CONFIG.MESSAGE.COURSE.NO_TITLE,
        'string.max': `{{#label}} should have a maximum length of {#limit}`,
        'any.required': `{{#label}} is a required field`
      }),
      image: Joi.array().max(200).messages({
        'string.max': `{{#label}} should have a maximum length of {#limit}`,
      }),
      session_per_course: Joi.number().min(1).integer().required().messages({
        'number.base': `{{#label}} must be a number`,
        'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
        'number.integer': `{{#label}} must be an integer `,
        'any.required': `{{#label}} is a required field`
      }),
      price: Joi.number().min(1).required().messages({
        'number.base': `{{#label}} must be a number`,
        'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
        'any.required': `{{#label}} is a required field`
      }),
      desc: Joi.string().max(500).required().messages({
        'string.empty': RESPONSE_CONFIG.MESSAGE.COURSE.NO_DESCRIPTION,
        'string.max': `{{#label}} should have a maximum length of {#limit}`,
        'any.required': `{{#label}} is a required field`
      }),
      level: Joi.number().integer().min(0).messages({
        'number.base': `{{#label}} must be a number`,
        'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
        'number.integer': `{{#label}} must be an integer `,
      }),
      rate: Joi.number().min(0).messages({
        'number.base': `{{#label}} must be a number`,
        'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
      }),
      discount: Joi.number().integer().min(0).messages({
        'number.base': `{{#label}} must be a number`,
        'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
        'number.integer': `{{#label}} must be an integer `,
      }),
    }),
    update_course: Joi.object<UpdateCourseDto>({
      course_code: Joi.string().max(10).required().messages({
        'string.empty': RESPONSE_CONFIG.MESSAGE.COURSE.NO_CODE,
        'string.max': `{{#label}} should have a maximum length of {#limit}`,
        'any.required': `{{#label}} is a required field`
      }),
      title: Joi.string().max(20).required().messages({
        'string.empty': RESPONSE_CONFIG.MESSAGE.COURSE.NO_TITLE,
        'string.max': `{{#label}} should have a maximum length of {#limit}`,
        'any.required': `{{#label}} is a required field`
      }),
      image: Joi.array().max(200).messages({
        'string.max': `{{#label}} should have a maximum length of {#limit}`,
      }),
      session_per_course: Joi.number().required().messages({
        'number.base': `{{#label}} must be a number`,
        'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
        'number.integer': `{{#label}} must be an integer `,
        'any.required': `{{#label}} is a required field`
      }),
      price: Joi.number().min(1).required().messages({
        'number.base': `{{#label}} must be a number`,
        'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
        'any.required': `{{#label}} is a required field`
      }),
      desc: Joi.string().max(500).required().messages({
        'string.empty': RESPONSE_CONFIG.MESSAGE.COURSE.NO_DESCRIPTION,
        'string.max': `{{#label}} should have a maximum length of {#limit}`,
        'any.required': `{{#label}} is a required field`
      }),
      level: Joi.string().min(0).messages({
        'number.base': `{{#label}} must be a number`,
        'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
        'number.integer': `{{#label}} must be an integer `,
      }),
      rate: Joi.number().min(0).messages({
        'number.base': `{{#label}} must be a number`,
        'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
      }),
      discount: Joi.number().integer().min(0).messages({
        'number.base': `{{#label}} must be a number`,
        'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
        'number.integer': `{{#label}} must be an integer `,
      }),
    }),
  },
};
