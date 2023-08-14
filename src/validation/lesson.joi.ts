import Joi from "joi";
import { ILesson } from "@/models/lesson.model";
import { UpdateLessonDto } from "@/types/lesson";
import { RESPONSE_CONFIG } from "@/configs/response.config";

export const LessonSchema = {
    Lesson: {
        create_lesson: Joi.object<ILesson>({
            session: Joi.string().required(),
            title: Joi.string().required(),
            content: Joi.string().required(),
            no: Joi.number().required(),
        }),
        update_lesson: Joi.object<UpdateLessonDto>({
            session: Joi.string().required(),
            title: Joi.string().required(),
            content: Joi.string().required(),
            no: Joi.number().required(),
        }),
    }
}