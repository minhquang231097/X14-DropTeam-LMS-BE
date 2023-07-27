import Joi from "joi";
import { IWorkplace } from "@/models/workplace.model";
import { WorkplaceBody } from "@/types/workplace/workplace";

export const WorkplaceSchema = {
    Workplace: {
        create_workplace: Joi.object<IWorkplace>({
            name: Joi.string().max(100).required(),
            address: Joi.string().max(200).required(),
            status: Joi.string().valid("ON", "OFF", "UPCOMING").required(),
            workplace_code: Joi.string().max(5).required(),
            image: Joi.string().required()
        }),
        update_workplace: Joi.object<IWorkplace>({
            name: Joi.string().max(100).required(),
            address: Joi.string().max(200).required(),
            status: Joi.string().valid("ON", "OFF", "UPCOMING").required(),
            workplace_code: Joi.string().max(5).required(),
            image: Joi.string().required()
        })
    }
}