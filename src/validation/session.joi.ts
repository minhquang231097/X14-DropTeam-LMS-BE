import Joi from "joi";
import { ISession } from "@/models/session.model";
import { CreateSessionDto, UpdateSessionDto } from "@/types/session";
import { RESPONSE_CONFIG } from "@/configs/response.config";

export const SessionSchema = {
    Session: {
        create_session: Joi.object<CreateSessionDto>({
            course_code: Joi.string().required().messages({
                'string.empty': `${RESPONSE_CONFIG.MESSAGE.SESSION.NO_COURSE} (import course code)`,
                'any.required': `{{#label}} is a required field`
            }),
            class_code: Joi.string().required().messages({
                'string.empty': `${RESPONSE_CONFIG.MESSAGE.SESSION.NO_CLASS} (import class code)`,
                'any.required': `{{#label}} is a required field`
            }),
            session_code: Joi.string().required().messages({
                'string.empty': RESPONSE_CONFIG.MESSAGE.SESSION.NO_CODE,
                'any.required': `{{#label}} is a required field`
            }),
            desc: Joi.string().required().messages({
                'string.empty': RESPONSE_CONFIG.MESSAGE.SESSION.NO_DES,
                'any.required': `{{#label}} is a required field`
            }),
            status: Joi.string().valid("COMPLETED", "UNCOMPLETED").required().messages({
                'any.only': `{{#label}} must be COMPLETED or UNCOMPLETED`,
            })
        }),
        update_session: Joi.object<UpdateSessionDto>({
            session_code: Joi.string().required().messages({
                'string.empty': RESPONSE_CONFIG.MESSAGE.SESSION.NO_CODE,
                'any.required': `{{#label}} is a required field`
            }),
            desc: Joi.string().required().messages({
                'string.empty': RESPONSE_CONFIG.MESSAGE.SESSION.NO_DES,
                'any.required': `{{#label}} is a required field`
            }),
            status: Joi.string().valid("COMPLETED", "UPCOMPLETED").required().messages({
                'any.only': `{{#label}} must be COMPLETED or UPCOMPLETED`,
            })
        }),
    }
}