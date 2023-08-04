import HttpException from "@/common/httpException";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import { NextFunction, Request, Response } from "express";

export class CheckRole {
  constructor() {}

  static async IsAdmin(req: Request, res: Response, next: NextFunction) {
    const user: any = req.user;
    user.role === "ADMIN" ? next() : res.sendStatus(400);
  }

  static async IsMentor(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    if (user.role !== "MENTOR") return res.sendStatus(400);
    next();
  }

  static async IsStudent(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    if (user.role !== "STUDENT") return res.sendStatus(400);
    next();
  }
}
