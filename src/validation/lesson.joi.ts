import Joi from "joi";
import { ILesson } from "@/models/lesson.model";
import { CreateLessonDto, UpdateLessonDto } from "@/types/lesson";
import { RESPONSE_CONFIG } from "@/configs/response.config";

export const LessonSchema = {
  Lesson: {
    create_lesson: Joi.object<CreateLessonDto>({
      course_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.LESSON.NO_SESSION} (import session code)`,
          "string.max": `{{#label}} should have a maximum length of {#limit}`,
          "any.required": `{{#label}} is a required field (import session code)`,
        }),
      title: Joi.string().required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.LESSON.NO_TITLE,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
      content: Joi.string().required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.LESSON.NO_CONTENT,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
      no: Joi.number().required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.LESSON.NO_NO,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
    }),
    update_lesson: Joi.object<UpdateLessonDto>({
      title: Joi.string().optional().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.LESSON.NO_TITLE,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
      content: Joi.string().optional().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.LESSON.NO_CONTENT,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
      no: Joi.number().optional().messages({
        "number.empty": RESPONSE_CONFIG.MESSAGE.LESSON.NO_NO,
        "number.base": `{{#label}} must be a number`,
        "number.min": `{{#label}} must greater than or equal to {{#limit}}`,
        "number.integer": `{{#label}} must be an integer `,
        "any.required": `{{#label}} is a required field`,
      }),
    }),
  },
};
