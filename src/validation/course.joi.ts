import Joi from "joi";
import { ICourse } from "@/models/course.model";

export const CourseSchema = {
    Course: {
        create_course: Joi.object<ICourse>({
            course_code: Joi.string().max(10).required(),
            title: Joi.string().max(100).required(),
            image: Joi.array().max(200),
            session_per_course: Joi.number().min(1).integer().required(),
            price: Joi.number().min(1).required(),
            desc: Joi.string().max(500).required(),
            lesson_list: Joi.array(),
            duration: Joi.number().integer().min(0),
            level: Joi.number().integer().min(0),
            rate: Joi.number().min(0),
            discount: Joi.number().integer().min(0)
        }).messages({
            'string.empty': `all field cannot be an empty `,
            'any.required': `all field is a required`
        }),
        update_course: Joi.object<ICourse>({
            course_code: Joi.string().max(10).required(),
            title: Joi.string().max(20).required(),
            image: Joi.array().max(200),
            session_per_course: Joi.number().integer().min(0).required(),
            price: Joi.number().min(10).required(),
            desc: Joi.string().max(500).required(),
            lesson_list: Joi.array(),
            duration: Joi.number().integer().min(0),
            level: Joi.number().integer().min(0),
            rate: Joi.number().min(0),
            discount: Joi.number().integer().min(0)
        }).messages({
            'string.empty': `all field cannot be an empty `,
            'any.required': `all field is a required`
        })
    }
}