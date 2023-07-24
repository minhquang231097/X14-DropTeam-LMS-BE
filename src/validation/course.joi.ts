import Joi from "joi";
import { ICourse } from "@/models/course.model";
import { CourseBody } from "@/types/course/course";

export const CourseSchema = {
    Course: {
        create_course: Joi.object<ICourse>({
            workplace: Joi.string().max(50).required(),
            course_code: Joi.string().max(10).required(),
            title: Joi.string().max(50).required(),
            image: Joi.string().max(200).required(),
            session_per_course: Joi.string().max(5).required(),
            price: Joi.string().max(10).required(),
        }),
        update_course: Joi.object<ICourse>({
            workplace: Joi.string().max(50).required(),
            course_code: Joi.string().max(10).required(),
            title: Joi.string().max(50).required(),
            image: Joi.string().max(200).required(),
            session_per_course: Joi.string().max(5).required(),
            price: Joi.string().max(10).required(),
        })
    }
}