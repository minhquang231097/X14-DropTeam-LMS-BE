import HttpException from "@/common/httpException";
import { NextFunction, Request, Response } from "express";

export const CheckRole = (role: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user.role;
    if (role.includes(userRole)) {
      return next();
    } else {
      return res.json(new HttpException("You don't have permission", 403));
    }
  };
};
