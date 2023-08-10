import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import userService from "@/services/user.service";
import { Request, Response } from "express-serve-static-core";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const GetUser = async (req: Request, res: Response) => {
  const { page, limit, email, field, filter, attendanceId } = req.query;
  const idUser = req.user._id;
  const p = Number(page);
  const l = Number(limit);
  try {
    if (email) {
      const user = await userService.GetUserByEmail(email as string);
      if (!user) {
        return res.json(
          new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404),
        );
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, user),
      );
    } else if (page && limit) {
      const allUsers = await userService.SearchUserByCondition(
        p,
        l,
        field as string,
        filter as string,
      );
      if (!allUsers) {
        return res.json(
          new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404),
        );
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, allUsers),
      );
    } else if (page && limit && attendanceId) {
      const allUsers = await userService.GetUserByAttendance(
        attendanceId as string,
        p,
        l,
      );
      if (!allUsers) {
        return res.json(
          new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404),
        );
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, allUsers),
      );
    } else {
      const info = await userService.GetUserById(idUser);
      if (!info) {
        return res.json(
          new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_LOGIN, 404),
        );
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, info),
      );
    }
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 404));
  }
};

const ChangePassword = async (req: Request, res: Response) => {
  const { id, token } = req.query;
  const { password } = req.body;
  try {
    const user: any = userService.GetUserById(id as string);
    if (!user) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
    }
    const verifyToken: any = jwt.verify(
      token as string,
      process.env.ACCESSTOKEN_KEY as string,
    );
    if (user && verifyToken._id) {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);
      const updatedUser = await userService.UpdateUserById(id as string, {
        password: newPassword,
      });
      return res.json(
        new HttpResponseData(
          RESPONSE_CONFIG.MESSAGE.USER.PASSWORD_CHANGED,
          200,
        ),
      );
    }
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
  }
};

const UpdateUserInfo = async (req: Request, res: Response) => {
  const { id } = req.user;
  const payload = req.body;
  try {
    const update = await userService.UpdateUserById(id, payload);
    if (!update) {
      return res.json(
        new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404),
      );
    }
    res.json(
      new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200, update),
    );
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
  }
};

const UpdatePassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  try {
    const exist = await userService.GetUserByCondition(password);
    if (!exist) {
      return res.json(
        new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404),
      );
    }
    res.json(
      new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200, exist),
    );
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
  }
};

const DeleteUser = async (req: Request, res: Response) => {
  const { id, email, username } = req.query;
  try {
    if (id) {
      const user = await userService.DeleteUserById(id as string);
      if (!user) {
        return res.json(
          new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404),
        );
      }
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200));
    } else if (email || username) {
      const user = await userService.DeleteUserByCondition(
        (email as string) || (username as string),
      );
      if (!user) {
        return res.json(
          new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404),
        );
      }
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200));
    }
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
  }
};

export default {
  GetUser,
  ChangePassword,
  UpdateUserInfo,
  UpdatePassword,
  DeleteUser,
};
