import { NextFunction, Request, Response } from "express";

export class CheckRole {
    constructor() { }

    static async IsAdmin(req: Request, res: Response, next: NextFunction) {

    }

    static async IsMentor(req: Request, res: Response, next: NextFunction) {

    }

    static async IsStudent(req: Request, res: Response, next: NextFunction) {

    }
}