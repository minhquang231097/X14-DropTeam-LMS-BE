import Joi from "joi";
import { ICourse } from "@/models/course.model";

export const CourseSchema = {
    Course: {
        create_course: Joi.object<ICourse>({
            course_code: Joi.string().max(10).required,
            title: Joi.string().max(20).required,
            image: Joi.string().max(200).required,
            session_per_course: Joi.string().max(5).required(),
            price: Joi.string().max(10).required,
        }),
        update_course: Joi.object<ICourse>({
            course_code: Joi.string().max(10).required,
            title: Joi.string().max(20).required,
            image: Joi.string().max(200).required,
            session_per_course: Joi.string().max(5).required(),
            price: Joi.string().max(10).required,
        })
    }
}