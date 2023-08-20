import Joi from "joi";
import { IFeedback } from "@/models/feedback.model";
import { CreateFeedbackDto, UpdateFeedbackDto } from "@/types/feedback";
import { RESPONSE_CONFIG } from "@/configs/response.config";

export const FeedbackSchema = {
  Feedback: {
    create_feedback: Joi.object<CreateFeedbackDto>({
      course_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.FEEDBACK.NO_COURSE} (import course code)`,
          "string.max": `{{#label}} should have a maximum length of {#limit}`,
          "any.required": `{{#label}} is a required field (import course code)`,
        }),
      student_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.FEEDBACK.NO_STUDENT} (import email student)`,
          "string.max": `{{#label}} should have a maximum length of {#limit}`,
          "any.required": `{{#label}} is a required field (import email student)`,
        }),
      rating: Joi.string()
        .regex(/^[0-5]/)
        .required()
        .messages({
          "string.empty": RESPONSE_CONFIG.MESSAGE.FEEDBACK.NO_RATE,
          "string.pattern.base": `{{#label}} have to match the required pattern: 0-5`,
          "string.max": `{{#label}} should have a maximum length of {#limit}`,
          "any.required": `{{#label}} is a required field`,
        }),
      content: Joi.string().required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.FEEDBACK.NO_CONTENT,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
    }),
    update_feedback: Joi.object<UpdateFeedbackDto>({
      course: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.FEEDBACK.NO_COURSE} (import course code)`,
          "string.max": `{{#label}} should have a maximum length of {#limit}`,
          "any.required": `{{#label}} is a required field`,
        }),
      student: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.FEEDBACK.NO_STUDENT} (import email student)`,
          "string.max": `{{#label}} should have a maximum length of {#limit}`,
          "any.required": `{{#label}} is a required field`,
        }),
      rating: Joi.string().required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.FEEDBACK.NO_RATE,
        "string.pattern.base": `{{#label}} have to match the required pattern: 0-5`,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
      content: Joi.string().required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.FEEDBACK.NO_CONTENT,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
    }),
  },
};
