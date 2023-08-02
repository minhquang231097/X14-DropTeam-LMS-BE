import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { UserRepository } from "@/repository/user.repo"
import HttpException from "@/common/httpException"
import HttpResponseData from "@/common/httpResponseData"
import { RESPONSE_CONFIG } from "@/configs/response.config"
import { SendMailService } from "@/services/sendMail.service"
import userService from "@/services/user.service"

const SignUp = async (req: Request, res: Response) => {
    try {
        const user: any = await userService.CreateUser(req.body)
        const refreshToken = jwt.sign({
            _id: user._id
        }, process.env.REFRESHTOKEN_KEY as string, { expiresIn: process.env.REFRESHTOKEN_TIME as string })
        const updatedUser = await userService.UpdateUserById(user._id, { refreshToken })
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, updatedUser))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message))
    }
}

const handleRefreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    try {
        const foundUser = await userService.GetUserByCondition({ refreshToken })
        if (!foundUser) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
        } else {
            jwt.verify(
                foundUser.refreshToken,
                process.env.REFRESHTOKEN_KEY as string,
                async (err: any, payload: any) => {
                    if (err) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
                    const accessToken = jwt.sign(
                        {
                            _id: foundUser._id,
                            username: payload.username,
                            role: foundUser.role
                        },
                        process.env.ACCESSTOKEN_KEY as string,
                        { expiresIn: process.env.ACCESSTOKEN_TIME as string }
                    );
                    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, { roles: foundUser.role, accessToken }))
                }
            );
        }
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[401], 401, error.message))
    }

}

const SignIn = async (req: Request, res: Response) => {
    const { username, password } = req.body
    try {
        const userExist = await userService.GetUserByUsername(username)
        if (!userExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
        }
        const checkPassword = bcrypt.compareSync(password, userExist.password)
        if (checkPassword) {
            const accessToken = jwt.sign({
                _id: userExist._id,
                username: userExist.username,
                role: userExist.role
            }, process.env.ACCESSTOKEN_KEY as string, { expiresIn: process.env.ACCESSTOKEN_TIME as string })

            jwt.verify(userExist.refreshToken, process.env.REFRESHTOKEN_KEY as string, async (err: any, payload: any) => {
                if (err) {
                    const newRefreshToken = jwt.sign({
                        _id: userExist._id
                    }, process.env.REFRESHTOKEN_KEY as string, { expiresIn: process.env.REFRESHTOKEN_TIME })
                    await userService.UpdateUserById(userExist._id, { refreshToken: newRefreshToken })
                }
            })

            return res.status(200).json({
                username: userExist.username,
                id: userExist._id,
                accessToken,
                refreshToken: userExist.refreshToken
            })
        }
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message))
    }
}

const GetInfoUser = async (req: Request, res: Response, next: NextFunction) => {
    const idUser = req.user._id
    try {
        const info = await userService.GetUserById(idUser)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, info))
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
    }
}

const GetAllUser = async (req: Request, res: Response) => {
    try {
        const allUsers = await userService.GetAllUser()
        return res.json(allUsers)
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
    }
}

const SignOutUser = async (req: Request, res: Response) => {
    const { id } = req.body
    try {
        const user = await userService.UpdateUserById(id, { accessToken: "" })
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, user))
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
    }
}

//Send email link for reset password
const SendEmailVerifyUser = async (req: Request, res: Response) => {
    const { email } = req.body
    const { address } = req.params
    if (!email) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
    }
    try {
        const user: any = await userService.GetUserByEmail(email)
        const token: any = jwt.sign({ _id: user._id }, process.env.ACCESSTOKEN_KEY as string, { expiresIn: "2m" })
        const updatedUser = await userService.UpdateUserById(user._id, { refreshToken: token })
        if (updatedUser) {
            const mailOption = {
                from: process.env.EMAIL_USERNAME,
                to: email,
                subject: "Xac thuc nguoi dung",
                text: `This link valid for 2 minutes ${process.env.HOST_FE}/${address}/${user._id}/${updatedUser.refreshToken}`
            }
            SendMailService.sendMail(mailOption, (err, payload) => {
                if (err) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
                return res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, payload))
            })
        }
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
    }
}

const SendEmailForgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body
    const { address } = req.params
    if (!email) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
    }
    try {
        const user: any = await userService.GetUserByEmail(email)
        const token: any = jwt.sign({ _id: user._id }, process.env.ACCESSTOKEN_KEY as string, { expiresIn: "2m" })
        const updatedUser = await userService.UpdateUserById(user._id, { refreshToken: token })
        if (updatedUser) {
            const mailOption = {
                from: process.env.EMAIL_USERNAME,
                to: email,
                subject: "Quen mat khau",
                text: `This link valid for 2 minutes ${process.env.HOST_FE}/${address}/${user._id}/${updatedUser.refreshToken}`
            }
            SendMailService.sendMail(mailOption, (err, payload) => {
                if (err) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
                return res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200))
            })
        }
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
    }
}

const ChangePassword = async (req: Request, res: Response) => {
    const { id, token } = req.query
    const _id = String(id)
    const _token = String(token)
    const { password } = req.body
    try {
        const user: any = userService.GetUserById(_id)
        const verifyToken: any = jwt.verify(_token, process.env.ACCESSTOKEN_KEY as string)
        if (user && verifyToken._id) {
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(password, salt)
            const updatedUser = await userService.UpdateUserById(_id, { password: newPassword })
            return res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, updatedUser))
        }
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
    }
}

const UpdateUserInfo = async (req: Request, res: Response) => {
    const { id } = req.user
    const payload = req.body
    try {
        const update = await userService.UpdateUserById(id, payload)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, update))
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
    }
}

export default { SignUp, SignIn, handleRefreshToken, GetAllUser, SignOutUser, SendEmailForgotPassword, ChangePassword, SendEmailVerifyUser, GetInfoUser, UpdateUserInfo }