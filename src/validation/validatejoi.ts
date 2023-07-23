import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (error: any) {
            return res.status(422).json({ error: error.details[0].message });
        }
    };
};