import Joi from "joi";
import { IRegistedCourse } from "@/models/registe.course.model";
import { RESPONSE_CONFIG } from "@/configs/response.config";

export const RegistSchema = {
    Regist: {
        regist_course: Joi.object<IRegistedCourse>({
            fullname: Joi.string().required(),
            email: Joi.string().required(),
            phone_number: Joi.string().regex(/^[0-9]/).min(5).max(100).required(),
            course: Joi.string().required(),
            workplace: Joi.string().required(),
            note: Joi.string().required(),
            student: Joi.string().required(),
        }),
    }
}
