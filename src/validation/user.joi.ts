import Joi from "joi";
import { IUser } from "../models/user.model"
import { SignInDto, SignOutDto, UpdateUserDto } from "@/types/user";

export const Schema = {
    User: {
        sign_up: Joi.object<IUser>({
            fullname: Joi.string().min(5).max(100).required(),
            email: Joi.string().min(5).max(100).required(),
            phone_number: Joi.string().regex(/^[0-9]/).min(5).max(100).required(),
            username: Joi.string().min(5).max(100).required(),
            password: Joi.string().min(5).max(100).required(),
            create_at: Joi.string().optional(),
            role: Joi.string().required(),
            dob: Joi.string().optional(),
            gender: Joi.string().optional(),
            address: Joi.string().optional(),
        }),
        sign_in: Joi.object<SignInDto>({
            username: Joi.string().min(5).max(100).required(),
            password: Joi.string().min(6).max(100).required(),
        }),
        sign_out: Joi.object<SignOutDto>({
            id: Joi.string().required()
        }),
        update: Joi.object<UpdateUserDto>({
            fullname: Joi.string().min(5).max(100).optional(),
            email: Joi.string().min(5).max(100).optional(),
            phone_number: Joi.string().regex(/^[0-9]/).min(5).max(100).optional(),
            username: Joi.string().min(5).max(100).optional(),
            password: Joi.string().min(5).max(100).optional(),
            create_at: Joi.string().optional(),
            role: Joi.string().optional(),
            dob: Joi.string().optional(),
            gender: Joi.string().optional(),
            address: Joi.string().optional(),
        })
    }
}