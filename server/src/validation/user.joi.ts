import Joi from "joi";
import { IUser } from "../models/user.model"
import { SignInBody } from "@/types/user/signin";
import { SignOutBody } from "@/types/user/sign_out";

export const Schema = {
    User: {
        sign_up: Joi.object<IUser>({
            fullname: Joi.string().min(5).max(100).required(),
            email: Joi.string().min(5).max(100).required(),
            phone_number: Joi.string().min(5).max(100).required(),
            username: Joi.string().min(5).max(100).required(),
            password: Joi.string().min(5).max(100).required(),
            create_at: Joi.string(),
            role: Joi.string()
        }),
        sign_in: Joi.object<SignInBody>({
            username: Joi.string().min(5).max(100).required(),
            password: Joi.string().min(5).max(100).required(),
        }),
        sign_out: Joi.object<SignOutBody>({
            id: Joi.string().required()
        })
    }
}