import HttpException from "@/common/httpException";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import { NextFunction, Request, Response } from "express";

export const CheckRole = (role: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user.role
      if(role.includes(userRole)){
        return next();
      }else{
       return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[403], 403))
      }
  }
}
