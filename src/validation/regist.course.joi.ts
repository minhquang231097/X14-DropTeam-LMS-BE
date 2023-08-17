import Joi from "joi";
import { IRegistedCourse } from "@/models/registe.course.model";
import { RESPONSE_CONFIG } from "@/configs/response.config";

export const RegistSchema = {
    Regist: {
        regist_course: Joi.object<IRegistedCourse>({
            fullname: Joi.string().min(5).max(100).required().messages({
                'string.empty': RESPONSE_CONFIG.MESSAGE.USER.NO_FULLNAME,
                'string.base': `{{#label}} should be type of text`,
                'string.min': `{{#label}} should have a minimum length of {#limit}`,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
            email: Joi.string().required(),
            phone_number: Joi.string().regex(/^[0-9]/).min(5).max(100).required().messages({
                'string.empty': RESPONSE_CONFIG.MESSAGE.USER.NO_PHONE_NUM,
                'string.pattern.base': `{{#label}} have to match the required pattern: 0-9`,
                'string.min': `{{#label}} should have a minimum length of {#limit}`,
                'string.max': `{{#label}} should have a maximum length of {#limit}`,
                'any.required': `{{#label}} is a required field`
            }),
            course: Joi.string().required().messages({
                'string.empty': `${RESPONSE_CONFIG.MESSAGE.REGIST.NO_COURSE} (import course code)`,
                'any.required': `{{#label}} is a required field`
            }),
            workplace: Joi.string().required().messages({
                'string.empty': RESPONSE_CONFIG.MESSAGE.REGIST.NO_WORKPLACE,
                'any.required': `{{#label}} is a required field`
            }),
            note: Joi.string(),
            student: Joi.string().required().messages({
                'string.empty': RESPONSE_CONFIG.MESSAGE.REGIST.NO_STUDENT,
                'any.required': `{{#label}} is a required field`
            }),
        }),
    }
}
