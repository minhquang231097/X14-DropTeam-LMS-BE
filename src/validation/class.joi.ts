import { IClass } from "@/models/class.model"
import Joi from "joi"

export const ClassSchema = {
    Class: {
        create_class: Joi.object<IClass>({
            mentor: Joi.string().required(),
            workplace: Joi.string().required(),
            course: Joi.string().required(),
            class_code: Joi.string().max(10).required(),
            start_at: Joi.string().optional(),
            end_at: Joi.string().optional(),
            expected_time_start: Joi.string().optional(),
            hour_per_class: Joi.string().optional(),
            schedule: Joi.string().required(),
            class_size: Joi.number().integer().required()
        })
    }
}