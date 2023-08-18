import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import userService from "@/services/user.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import classStudentService from "@/services/class.student.service";

const GetUser = async (req: Request, res: Response) => {
  const { page, limit, email, attendanceId, class_code, search } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    const countDoc = await userService.GetTotalUser();
    if (class_code) {
      const num = await classStudentService.GetAllStudentInClass(class_code as string);
      const result = await classStudentService.GetAllStudentInClass(class_code as string, p, l);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, {
          list: result,
          page: p,
          count: result.length,
          total: countDoc,
          total_page: Math.ceil(num.length / l),
        }),
      );
    } else if (email) {
      const result = await userService.GetUserByEmail(email as string);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
      }
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, result));
    } else if (attendanceId) {
      const num = await userService.GetUserByAttendance(attendanceId as string);
      const result = await userService.GetUserByAttendance(attendanceId as string, p, l);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, {
          list: result,
          page: p,
          count: result.length,
          total: countDoc,
          total_page: Math.ceil(num.length / l),
        }),
      );
    } else if (search) {
      const num = await userService.SearchUserByCondition(search as string);
      const result = await userService.SearchUserByCondition(search as string, p, l);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, {
          list: result,
          page: p,
          count: result.length,
          total: countDoc,
          total_page: Math.ceil(num.length / l),
        }),
      );
    } else if (page && limit) {
      const result = await userService.GetAllUser(p, l);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, {
          list: result,
          page: p,
          count: result.length,
          total: countDoc,
          total_page: Math.ceil(countDoc / l),
        }),
      );
    } else {
      const result = await userService.GetAllUser(1, 10);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, {
          list: result,
          page: 1,
          count: result.length,
          total: countDoc,
        }),
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
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_CORRECT, 404));
    }
    const verifyToken: any = jwt.verify(token as string, process.env.ACCESSTOKEN_KEY as string);
    if (user && verifyToken._id) {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);
      await userService.UpdateUserById(id as string, {
        password: newPassword,
      });
      return res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.PASSWORD_CHANGED, 200));
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
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
    }
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200, update));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
  }
};

const UpdatePassword = async (req: Request, res: Response) => {
  const { password, newPassword } = req.body;
  const { _id } = req.user;
  try {
    const exist = await userService.GetUserById(_id);
    if (!exist) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
    }
    const checkPassword = bcrypt.compareSync(password, exist.password);
    if (!checkPassword) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.PASS_NOT_CORRECT, 404));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await userService.UpdateUserById(_id, { password: hashedPassword });
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200));
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
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
      }
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200));
    } else if (email || username) {
      const user = await userService.DeleteUserByCondition((email as string) || (username as string));
      if (!user) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
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
