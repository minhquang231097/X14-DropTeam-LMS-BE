import Joi from "joi";
import { ISession } from "@/models/session.model";
import { UpdateSessionDto } from "@/types/session";
import { RESPONSE_CONFIG } from "@/configs/response.config";

export const SessionSchema = {
    Session: {
        create_session: Joi.object<ISession>({
            course: Joi.string().required(),
            class: Joi.string().required(),
            session_code: Joi.string().required(),
            session_name: Joi.string().required(),
            desc: Joi.string().required(),
            status: Joi.string().valid("COMPLETE", "UPCOMPLETE").required()
        }),
        update_session: Joi.object<ISession>({
            course: Joi.string().required(),
            class: Joi.string().required(),
            session_code: Joi.string().required(),
            session_name: Joi.string().required(),
            desc: Joi.string().required(),
            status: Joi.string().valid("COMPLETE", "UPCOMPLETE").required()
        }),
    }
}