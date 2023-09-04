import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import userService from "@/services/user.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import classStudentService from "@/services/class.student.service";
import mongoose from "mongoose";

const LIMIT_PAGE_USER = 20;

const GetUser = async (req: Request, res: Response) => {
  const { page, limit, attendance_id, class_id, search, role } = req.query;
  const { sortBy } = req.body;
  const p = Number(page);
  const l = Number(limit);
  try {
    if (
      (!attendance_id || mongoose.isValidObjectId(attendance_id)) &&
      (!class_id || mongoose.isValidObjectId(class_id))
    ) {
      const countDoc = await userService.GetTotalUser();
      if (class_id) {
        const num = await classStudentService.GetAllStudentInClass(class_id as string);
        let result;
        if (p === undefined && l === undefined) {
          result = await classStudentService.GetAllStudentInClass(class_id as string, 1, LIMIT_PAGE_USER, sortBy);
        } else {
          result = await classStudentService.GetAllStudentInClass(class_id as string, p, l, sortBy);
        }
        if (result.length === 0)
          return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
        res
          .status(200)
          .json(
            new HttpResponseData(
              RESPONSE_CONFIG.MESSAGE.USER.FOUND,
              200,
              result,
              result.length,
              num.length,
              p,
              Math.ceil(num.length / l),
            ),
          );
      } else if (role && !search) {
        const num = await userService.GetUserByRole(role as string);
        let result;
        if (p === undefined && l === undefined) {
          result = await userService.GetUserByRole(role as string, 1, LIMIT_PAGE_USER, sortBy);
        } else {
          result = await userService.GetUserByRole(role as string, p, l, sortBy);
        }
        if (result.length === 0)
          return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
        res
          .status(200)
          .json(
            new HttpResponseData(
              RESPONSE_CONFIG.MESSAGE.USER.FOUND,
              200,
              result,
              result.length,
              num.length,
              p,
              Math.ceil(num.length / l),
            ),
          );
      } else if (attendance_id) {
        const num = await userService.GetUserByAttendance(attendance_id as string);
        let result;
        if (p === undefined && l === undefined) {
          result = await userService.GetUserByAttendance(attendance_id as string, 1, LIMIT_PAGE_USER, sortBy);
        } else {
          result = await userService.GetUserByAttendance(attendance_id as string, p, l, sortBy);
        }
        if (result.length === 0)
          return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
        res
          .status(200)
          .json(
            new HttpResponseData(
              RESPONSE_CONFIG.MESSAGE.USER.FOUND,
              200,
              result,
              result.length,
              num.length,
              p,
              Math.ceil(num.length / l),
            ),
          );
      } else if (search) {
        if (!role) {
          const num = await userService.SearchUserByCondition(search as string);
          let result;
          if (p === undefined && l === undefined) {
            result = await userService.SearchUserByCondition(search as string, 1, LIMIT_PAGE_USER, sortBy);
          } else {
            result = await userService.SearchUserByCondition(search as string, p, l, sortBy);
          }
          if (result.length === 0)
            return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
          res
            .status(200)
            .json(
              new HttpResponseData(
                RESPONSE_CONFIG.MESSAGE.USER.FOUND,
                200,
                result,
                result.length,
                num.length,
                p,
                Math.ceil(num.length / l),
              ),
            );
        } else {
          const num = await userService.SearchUserByConditionAndRole(search as string, role as string);
          let result;
          if (p === undefined && l === undefined) {
            result = await userService.SearchUserByConditionAndRole(
              search as string,
              role as string,
              1,
              LIMIT_PAGE_USER,
              sortBy,
            );
          } else {
            result = await userService.SearchUserByConditionAndRole(search as string, role as string, p, l, sortBy);
          }
          if (result.length === 0)
            return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
          res
            .status(200)
            .json(
              new HttpResponseData(
                RESPONSE_CONFIG.MESSAGE.USER.FOUND,
                200,
                result,
                result.length,
                num.length,
                p,
                Math.ceil(num.length / l),
              ),
            );
        }
      } else if (page && limit) {
        const result = await userService.GetAllUser(p, l, sortBy);
        if (result.length === 0)
          return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
        res
          .status(200)
          .json(
            new HttpResponseData(
              RESPONSE_CONFIG.MESSAGE.USER.FOUND,
              200,
              result,
              result.length,
              countDoc,
              p,
              Math.ceil(countDoc / l),
            ),
          );
      } else {
        const result = await userService.GetAllUser(1, LIMIT_PAGE_USER, sortBy);
        if (result.length === 0)
          return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
        res
          .status(200)
          .json(
            new HttpResponseData(
              RESPONSE_CONFIG.MESSAGE.USER.FOUND,
              200,
              result,
              result.length,
              countDoc,
              1,
              Math.ceil(countDoc / LIMIT_PAGE_USER),
            ),
          );
      }
    } else {
      return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.SESSION.NOT_FOUND, 404));
    }
  } catch (error) {
    return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
  }
};

const ChangePassword = async (req: Request, res: Response) => {
  const { id, token } = req.query;
  const { password } = req.body;
  try {
    const user: any = userService.GetUserById(id as string);
    if (!user) return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_CORRECT, 404));
    const verifyToken: any = jwt.verify(token as string, process.env.ACCESSTOKEN_KEY as string);
    if (user && verifyToken._id) {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);
      await userService.UpdateUserById(id as string, {
        password: newPassword,
      });
      return res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.PASSWORD_CHANGED, 200));
    }
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
  }
};

const GetUserInfoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userService.GetUserById(id);
    if (!user) return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200, user));
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
  }
};

const GetUserInfo = async (req: Request, res: Response) => {
  const { _id } = req.user;
  try {
    const user = await userService.GetUserById(_id);
    if (!user) return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200, user));
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
  }
};

const UpdateUserInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const exist = await userService.GetUserById(id);
    if (!exist) return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
    await userService.UpdateUserById(id, payload);
    const newUser = await userService.GetUserById(id);
    const { email, fullname, phone_number, dob, gender, address, avatar } = newUser;
    res.status(200).send(
      new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200, {
        email,
        fullname,
        phone_number,
        dob,
        gender,
        address,
        avatar,
      }),
    );
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
  }
};

const UpdateInfo = async (req: Request, res: Response) => {
  const payload = req.body;
  const id = req.user._id;
  try {
    await userService.UpdateUserById(id, payload);
    const newUser = await userService.GetUserById(id);
    const { email, fullname, phone_number, dob, gender, address, avatar } = newUser;
    res.status(200).send(
      new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200, {
        email,
        fullname,
        phone_number,
        dob,
        gender,
        address,
        avatar,
      }),
    );
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
  }
};

const UpdatePassword = async (req: Request, res: Response) => {
  const { password, newPassword } = req.body;
  const { _id } = req.user;
  try {
    const exist = await userService.GetUserById(_id);
    if (!exist) return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
    const checkPassword = bcrypt.compareSync(password, exist.password);
    if (!checkPassword)
      return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.PASS_NOT_CORRECT, 404));
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await userService.UpdateUserById(_id, { password: hashedPassword });
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200));
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
  }
};

const DeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exist = await userService.DeleteUserById(id as string);
    if (!exist) return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200));
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
  }
};

export default {
  GetUser,
  GetUserInfoById,
  ChangePassword,
  UpdateUserInfo,
  UpdatePassword,
  DeleteUser,
  GetUserInfo,
  UpdateInfo,
};
