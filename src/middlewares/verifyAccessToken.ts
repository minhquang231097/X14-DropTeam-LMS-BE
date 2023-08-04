import HttpException from "@/common/httpException";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyAccessJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader =
    (req.headers.authorization as string) ||
    (req.headers.Authorization as string);
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.ACCESSTOKEN_KEY as string,
    (err: any, decoded: any) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          return res.sendStatus(403);
        }
        return res.json(new HttpException("Token Failed!", 401, err.message));
      }
      req.user = decoded;
      next();
    },
  );
};
