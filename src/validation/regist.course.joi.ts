import Joi from "joi";
import { IRegistedCourse } from "@/models/registe.course.model";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import { RegistCourseDto, AdminRegistCourseDto, StudentRegistCourseDto, UpdateRegistCourseDto } from "@/types/regist.course";

export const RegistSchema = {
  Regist: {
    admin_regist_course: Joi.object<AdminRegistCourseDto>({
      course_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import course id)`,
        }),
      workplace_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import workplace id)`,
        }),
      student_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import workplace id)`,
        }),
      note: Joi.string().min(0),
    }),
    student_regist_course: Joi.object<StudentRegistCourseDto>({
      course_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import course id)`,
          "any.required": `{{#label}} is a required field`,
        }),
      workplace_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import workplace id)`,
          "any.required": `{{#label}} is a required field`,
        }),
      note: Joi.string().min(0),
    }),
    update_regist_course: Joi.object<UpdateRegistCourseDto>({
      course: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import course id)`,
          "any.required": `{{#label}} is a required field`,
        }),
      workplace: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import workplace id)`,
          "any.required": `{{#label}} is a required field`,
        }),
      note: Joi.string().optional().min(0),
    }),
  },
};
