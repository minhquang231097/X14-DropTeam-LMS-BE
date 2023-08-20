import Joi from "joi";
import { IRegistedCourse } from "@/models/registe.course.model";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import { RegistCourseDto } from "@/types/regist.course";

export const RegistSchema = {
  Regist: {
    regist_course: Joi.object<RegistCourseDto>({
      course_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import course code)`,
          "any.required": `{{#label}} is a required field`,
        }),
      workplace_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import workplace code)`,
          "any.required": `{{#label}} is a required field`,
        }),
      note: Joi.string(),
    }),
    update_course: Joi.object<RegistCourseDto>({
      course_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import course code)`,
          "any.required": `{{#label}} is a required field`,
        }),
      workplace_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import workplace code)`,
          "any.required": `{{#label}} is a required field`,
        }),
      note: Joi.string(),
    }),
  },
};
