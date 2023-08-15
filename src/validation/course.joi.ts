import Joi from "joi";
import { ICourse } from "@/models/course.model";
import { UpdateCourseDto } from "@/types/course";

export const CourseSchema = {
  Course: {
    create_course: Joi.object<ICourse>({
      course_code: Joi.string().max(10).required(),
      title: Joi.string().max(100).required(),
      image: Joi.array().max(200),
      session_per_course: Joi.number().min(1).integer().required(),
      price: Joi.number().min(1).required(),
      desc: Joi.string().max(500).required(),
      level: Joi.string().min(0),
      rate: Joi.number().min(0),
      discount: Joi.number().integer().min(0),
    }),
    update_course: Joi.object<UpdateCourseDto>({
      course_code: Joi.string().max(10).required(),
      title: Joi.string().max(20).required(),
      image: Joi.array().max(200),
      session_per_course: Joi.number().required(),
      price: Joi.number().max(10).required(),
      desc: Joi.string().max(500).required(),
      level: Joi.string().min(0),
      rate: Joi.number().min(0),
      discount: Joi.number().integer().min(0),
    }),
  },
};
