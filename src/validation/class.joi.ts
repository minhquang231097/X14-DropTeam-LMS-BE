import Joi from "joi";
import { IClass } from "@/models/class.model";

export const ClassSchema = {
    Class: {
        create_class: Joi.object<IClass>({
            mentor: Joi.string().max(50).required(),
            workplace: Joi.string().max(50).required(),
            course: Joi.string().max(50).required(),
            class_code: Joi.string().max(5).required(),
            start_at: Joi.date().greater('now').required(),
            end_at: Joi.date().greater('now').required(),
            expected_time_start: Joi.date().greater('now').required(),
            hour_per_class: Joi.string().max(5).required(),
            schedule: Joi.string().max(50).required(),
            class_size: Joi.number().integer().min(0).required()
        }).messages({
            'string.empty': `all field cannot be an empty `,
            'any.required': `all field is a required`
        }),
        update_class: Joi.object<IClass>({
            mentor: Joi.string().max(50),
            workplace: Joi.string().max(50),
            course: Joi.string().max(50),
            class_code: Joi.string().max(5),
            start_at: Joi.date().greater('now'),
            end_at: Joi.date().greater('now'),
            expected_time_start: Joi.date().greater('now'),
            hour_per_class: Joi.string().max(5),
            schedule: Joi.string().max(50),
            class_size: Joi.number().integer().min(0)
        }).messages({
            'string.empty': `all field cannot be an empty `,
            'any.required': `all field is a required`
        })
    }
}