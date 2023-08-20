import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import { SendMailService } from "@/services/sendMail.service";
import userService from "@/services/user.service";

const SignUp = async (req: Request, res: Response) => {
  const payload = req.body;
  try {
    const user: any = await userService.CreateUser(payload);
    const refreshToken = jwt.sign(
      {
        _id: user._id,
      },
      process.env.REFRESHTOKEN_KEY as string,
      { expiresIn: process.env.REFRESHTOKEN_TIME as string },
    );
    const updatedUser = await userService.UpdateUserById(user._id, {
      refreshToken,
    });
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.SIGNUP_SUCCESS, 200, updatedUser));
  } catch (error: any) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
  }
};

const handleRefreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    const foundUser = await userService.GetUserByCondition({ refreshToken });
    if (!foundUser) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.TOKEN_ERROR, 404));
    } else {
      jwt.verify(foundUser.refreshToken, process.env.REFRESHTOKEN_KEY as string, async (err: any, payload: any) => {
        if (err) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
        const accessToken = jwt.sign(
          {
            _id: foundUser._id,
            username: payload.username,
            role: foundUser.role,
          },
          process.env.ACCESSTOKEN_KEY as string,
          { expiresIn: process.env.ACCESSTOKEN_TIME as string },
        );
        res.status(200).json(
          new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200, {
            roles: foundUser.role,
            accessToken,
          }),
        );
      });
    }
  } catch (error: any) {
    return res.status(401).json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 401));
  }
};

const SignIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const userExist = await userService.GetUserByUsername(username);
    if (!userExist) {
      return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_CORRECT, 404));
    }
    const checkPassword = bcrypt.compareSync(password, userExist.password);
    if (checkPassword) {
      const accessToken = jwt.sign(
        {
          _id: userExist._id,
          username: userExist.username,
          role: userExist.role,
        },
        process.env.ACCESSTOKEN_KEY as string,
        { expiresIn: process.env.ACCESSTOKEN_TIME as string },
      );

      jwt.verify(userExist.refreshToken, process.env.REFRESHTOKEN_KEY as string, async (err: any, payload: any) => {
        if (err) {
          const newRefreshToken = jwt.sign(
            {
              _id: userExist._id,
            },
            process.env.REFRESHTOKEN_KEY as string,
            { expiresIn: process.env.REFRESHTOKEN_TIME },
          );
          await userService.UpdateUserById(userExist._id, {
            refreshToken: newRefreshToken,
          });
        }
      });

      res.status(200).json({
        username: userExist.username,
        id: userExist._id,
        accessToken,
        refreshToken: userExist.refreshToken,
        role: userExist.role,
      });
    } else {
      res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_CORRECT, 400));
    }
  } catch (error: any) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400, error.message));
  }
};

const SignOutUser = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const user = await userService.UpdateUserById(id, { accessToken: "" });
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200, user));
  } catch (error) {
    return res.status(400).json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
  }
};

//Send email link for reset password
const SendEmailVerifyUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NO_EMAIL, 400));
  }
  try {
    const user: any = await userService.GetUserByEmail(email);
    const token: any = jwt.sign({ _id: user._id }, process.env.ACCESSTOKEN_KEY as string, { expiresIn: "2m" });
    const updatedUser = await userService.UpdateUserById(user._id, {
      refreshToken: token,
    });
    if (updatedUser) {
      const mailOption = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Xac thuc nguoi dung",
        text: `This link valid for 2 minutes ${process.env.HOST_FE}/verify?id=${user._id}&token=${updatedUser.refreshToken}`,
      };
      SendMailService.sendMail(mailOption, (err, payload) => {
        if (err) return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
        return res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200, payload));
      });
    }
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.EMAIL_INCORRECT, 400));
  }
};

const SendEmailForgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NO_EMAIL, 400));
  }
  try {
    const user: any = await userService.GetUserByEmail(email);
    if (!user) {
      return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
    }
    const token: any = jwt.sign({ _id: user._id }, process.env.ACCESSTOKEN_KEY as string, { expiresIn: "2m" });
    const updatedUser = await userService.UpdateUserById(user._id, {
      refreshToken: token,
    });
    if (updatedUser) {
      const mailOption = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Quen mat khau",
        text: `This link valid for 2 minutes ${process.env.HOST_FE}/reset-password?id=${user._id}&token=${updatedUser.refreshToken}`,
      };
      SendMailService.sendMail(mailOption, (err, payload) => {
        if (err) return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
        return res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200));
      });
    }
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.EMAIL_INCORRECT, 400));
  }
};

export default {
  SignUp,
  SignIn,
  handleRefreshToken,
  SignOutUser,
  SendEmailForgotPassword,
  SendEmailVerifyUser,
};
