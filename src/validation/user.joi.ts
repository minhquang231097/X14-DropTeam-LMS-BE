import Joi from "joi";
import { IUser } from "../models/user.model";
import { ChangePasswordDto, NewPasswordDto, SendEmailForgotPasswordDto, SignInDto, SignOutDto, UpdateUserDto } from "@/types/user";
import { RESPONSE_CONFIG } from "@/configs/response.config";

export const Schema = {
  User: {
    sign_up: Joi.object<IUser>({
      fullname: Joi.string().min(5).max(100).required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.USER.NO_FULLNAME,
        "string.base": `{{#label}} should be type of text`,
        "string.min": `{{#label}} should have a minimum length of {#limit}`,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
      email: Joi.string().email().min(5).max(100).required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.USER.NO_EMAIL,
        "string.min": `{{#label}} should have a minimum length of {#limit}`,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
        "string.email": `{{#label} is not an email`
      }),
      phone_number: Joi.string()
        .regex(/^\+?[0-9][0-9]{7,14}$/)
        .min(5)
        .max(12)
        .required()
        .messages({
          "string.empty": RESPONSE_CONFIG.MESSAGE.USER.NO_PHONE_NUM,
          "string.pattern.base": `{{#label}} have to match the required pattern: 0-9`,
          "string.min": `{{#label}} should have a minimum length of {#limit}`,
          "string.max": `{{#label}} should have a maximum length of {#limit}`,
          "any.required": `{{#label}} is a required field`,
        }),
      username: Joi.string().regex(/^[^\W_]+$/).min(5).max(100).required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.USER.NO_USERNAME,
        "string.min": `{{#label}} should have a minimum length of {#limit}`,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
      password: Joi.string().regex(/^(?!.* )[A-Z-0-9a-zd$@$!%*?&.]/).min(5).max(100).required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.USER.NO_PASSWORD,
        "string.min": `{{#label}} should have a minimum length of {#limit}`,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
      avatar: Joi.string().optional(),
      create_at: Joi.string().optional(),
      role: Joi.string(),
      dob: Joi.string().required(),
      gender: Joi.string().required(),
      address: Joi.string().required(),
    }),
    sign_in: Joi.object<SignInDto>({
      username: Joi.string().min(5).max(100).required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.USER.NO_USERNAME,
        "string.min": `{{#label}} should have a minimum length of {#limit}`,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
      password: Joi.string().min(5).max(20).required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.USER.NO_PASSWORD,
        "string.min": `{{#label}} should have a minimum length of {#limit}`,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
    }),
    sign_out: Joi.object<SignOutDto>({
      id: Joi.string().required().messages({
        "string.empty": `No id found`,
        "any.require": `No id found`,
      }),
    }),
    update: Joi.object<UpdateUserDto>({
      email: Joi.string().min(5).max(100).optional().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.USER.NO_EMAIL,
        "string.min": `{{#label}} should have a minimum length of {#limit}`,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
      fullname: Joi.string().min(5).max(100).optional().messages({
        "string.base": `{{#label}} should be type of text`,
        "string.empty": RESPONSE_CONFIG.MESSAGE.USER.NO_FULLNAME,
        "string.min": `{{#label}} should have a minimum length of {#limit}`,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
      phone_number: Joi.string()
        .regex(/^[0-9]/)
        .min(5)
        .max(100)
        .optional()
        .messages({
          "string.empty": RESPONSE_CONFIG.MESSAGE.USER.NO_PHONE_NUM,
          "string.pattern.base": `{{#label}} have to match the required pattern: 0-9`,
          "string.min": `{{#label}} should have a minimum length of {#limit}`,
          "string.max": `{{#label}} should have a maximum length of {#limit}`,
          "any.required": `{{#label}} is a required field`,
        }),
      avatar: Joi.string().optional(),
      dob: Joi.string().optional(),
      gender: Joi.string().optional(),
      address: Joi.string().optional(),
    }),
    forgot_password: Joi.object<SendEmailForgotPasswordDto>({
      email: Joi.string().min(5).max(100).optional().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.USER.NO_EMAIL,
        "string.min": `{{#label}} should have a minimum length of {#limit}`,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
    }),
    new_password: Joi.object<NewPasswordDto>({
      password: Joi.string().min(5).max(100).required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.USER.NO_PASSWORD,
        "string.min": `{{#label}} should have a minimum length of {#limit}`,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
    }),
    change_password: Joi.object<ChangePasswordDto>({
      password: Joi.string().min(5).max(100).required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.USER.NO_PASSWORD,
        "string.min": `{{#label}} should have a minimum length of {#limit}`,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
      newPassword: Joi.string().min(5).max(100).required().messages({
        "string.empty": RESPONSE_CONFIG.MESSAGE.USER.NO_PASSWORD,
        "string.min": `{{#label}} should have a minimum length of {#limit}`,
        "string.max": `{{#label}} should have a maximum length of {#limit}`,
        "any.required": `{{#label}} is a required field`,
      }),
    }),
  },
};
