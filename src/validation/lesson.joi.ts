import Joi from "joi";
import { ILesson } from "@/models/lesson.model";
import { UpdateLessonDto } from "@/types/lesson";
import { RESPONSE_CONFIG } from "@/configs/response.config";

export const LessonSchema = {
    Lesson: {
        create_lesson: Joi.object<ILesson>({
            session: Joi.string().required().messages({
                'string.empty': RESPONSE_CONFIG.MESSAGE.LESSON.NO_SESSION,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
            title: Joi.string().required().messages({
                'string.empty': RESPONSE_CONFIG.MESSAGE.LESSON.NO_TITLE,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
            content: Joi.string().required().messages({
                'string.empty': RESPONSE_CONFIG.MESSAGE.LESSON.NO_CONTENT,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
            no: Joi.number().required().messages({
                'string.empty': RESPONSE_CONFIG.MESSAGE.LESSON.NO_NO,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
        }),
        update_lesson: Joi.object<UpdateLessonDto>({
            session: Joi.string().required().messages({
                'string.empty': RESPONSE_CONFIG.MESSAGE.LESSON.NO_SESSION,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
            title: Joi.string().required().messages({
                'string.empty': RESPONSE_CONFIG.MESSAGE.LESSON.NO_TITLE,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
            content: Joi.string().required().messages({
                'string.empty': RESPONSE_CONFIG.MESSAGE.LESSON.NO_CONTENT,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
            no: Joi.number().required().messages({
                'string.empty': RESPONSE_CONFIG.MESSAGE.LESSON.NO_NO,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
        }),
    }
}