import { IClass } from "@/models/class.model";
import Joi from "joi";

export const ClassSchema = {
  Class: {
    create_class: Joi.object<IClass>({
      mentor: Joi.string().required(),
      workplace: Joi.string().required(),
      course: Joi.string().required(),
      class_code: Joi.string().max(10).required(),
      start_at: Joi.date().required(),
      end_at: Joi.string().optional(),
      session_per_week: Joi.number().integer().optional(),
      schedule: Joi.array().required(),
      total_session: Joi.number().integer().required(),
      class_size: Joi.number().integer().required(),
      formated_date: Joi.string().optional(),
    }),
  },
};
