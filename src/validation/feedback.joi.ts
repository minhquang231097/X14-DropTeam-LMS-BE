import Joi from "joi";
import { IFeedback } from "@/models/feedback.model";
import { UpdateFeedbackDto } from "@/types/feedback";
import { RESPONSE_CONFIG } from "@/configs/response.config";

export const FeedbackSchema = {
    Feedback: {
        create_feedback: Joi.object<IFeedback>({
            course: Joi.string().required(),
            student: Joi.string().required(),
            rating: Joi.string().required(),
            content: Joi.string().required(),
        }),
        update_feedback: Joi.object<UpdateFeedbackDto>({
            course: Joi.string().required(),
            student: Joi.string().required(),
            rating: Joi.string().required(),
            content: Joi.string().required(),
        }),
    }
}