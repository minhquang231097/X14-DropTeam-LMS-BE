import Joi from "joi";
import { IAttendance } from "@/models/attendance.model";
import { CreateAttendanceDto, UpdateAttendanceDto } from "@/types/attendance";
import { RESPONSE_CONFIG } from "@/configs/response.config";

export const AttendanceSchema = {
    Attendance: {
        create_attendance: Joi.object<CreateAttendanceDto>({
            session_code: Joi.string().required().messages({
                'string.empty': `${RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NO_SESSION} (import session_code)`,
                'any.required': `{{#label}} is a required field `
            }),
            class_code: Joi.string().required().messages({
                'string.empty': `${RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NO_CLASS} (import class_code)`,
                'any.required': `{{#label}} is a required field `
            }),
            day: Joi.number().integer().min(1).required().messages({
                'number.base': `{{#label}} must be a number`,
                'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
                'number.integer': `{{#label}} must be an integer `,
                'any.required': `{{#label}} is a required field`
            }),
            absence: Joi.number().integer().min(1).required(),
            class_size: Joi.number().integer().min(1).required().messages({
                'number.base': `{{#label}} must be a number`,
                'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
                'number.integer': `{{#label}} must be an integer `,
                'any.required': `{{#label}} is a required field`
            }),
        }),
        update_attendance: Joi.object<UpdateAttendanceDto>({
            session: Joi.string().required().messages({
                'string.empty': RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NO_SESSION,
                'any.required': `{{#label}} is a required field`
            }),
            class: Joi.string().required().messages({
                'string.empty': RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NO_CLASS,
                'any.required': `{{#label}} is a required field`
            }),
            day: Joi.number().required().messages({
                'number.base': `{{#label}} must be a number`,
                'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
                'number.integer': `{{#label}} must be an integer `,
                'any.required': `{{#label}} is a required field`
            }),
            absence: Joi.number().integer().min(1).required(),
            class_size: Joi.number().integer().min(1).required().messages({
                'number.base': `{{#label}} must be a number`,
                'number.min': `{{#label}} must greater than or equal to {{#limit}}`,
                'number.integer': `{{#label}} must be an integer `,
                'any.required': `{{#label}} is a required field`
            }),
        }),
    }
}
