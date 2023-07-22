import { Request, Response } from "express"
import { UserService } from "@/services"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { UserRepository } from "@/repository/user.repo"
import HttpException from "@/common/httpException"
import HttpResponseData from "@/common/httpResponseData"
import { RESPONSE_CONFIG } from "@/configs/response.config"

const SignUp = async (req: Request, res: Response) => {
    try {
        const user: any = await UserService.CreateUser(req.body)
        const refreshToken = jwt.sign({
            _id: user._id
        }, process.env.REFRESHTOKEN_KEY as string, { expiresIn: process.env.REFRESHTOKEN_TIME as string })
        const updatedUser = await UserService.UpdateUser(user._id, { refreshToken })
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, updatedUser))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message))
    }
}

const handleRefreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    try {
        const foundUser = await UserRepository.FindUserByCondition({ refreshToken })
        if (!foundUser) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
        jwt.verify(
            refreshToken,
            process.env.REFRESHTOKEN_KEY as string,
            (err: any, payload: any) => {
                if (err || foundUser.username !== payload.username) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
                const accessToken = jwt.sign(
                    {
                        _id: foundUser._id,
                        username: payload.username,
                        role: foundUser.role
                    },
                    process.env.ACCESSTOKEN_KEY as string,
                    { expiresIn: process.env.ACCESSTOKEN_TIME as string }
                );
                const decode: any = jwt.decode(accessToken)
                const timeRefresh = 31536000 - (decode.iat - payload.iat)
                const newRefreshToken = jwt.sign({
                    _id: foundUser._id
                }, process.env.REFRESHTOKEN_KEY as string, { expiresIn: `${timeRefresh}` })
                UserService.UpdateUser(foundUser._id, { refreshToken: newRefreshToken })
                res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, { roles: foundUser.role, accessToken, refreshToken: newRefreshToken }))
            }
        );
    } catch (error: any) {
        throw new HttpException(RESPONSE_CONFIG.MESSAGE[401], 401, error.message)
    }

}

const SignIn = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        const userExist = await UserService.FindUserByUsername(username)
        if (!userExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
        }
        const checkPassword = bcrypt.compareSync(password, userExist.password)
        if (checkPassword) {
            const accessToken = jwt.sign({
                _id: userExist._id,
                username: userExist.username,
                role: userExist.role
            }, process.env.ACCESSTOKEN_KEY as string, { expiresIn: process.env.ACCESSTOKEN_TIME as string })

            return res.status(200).json({
                username: userExist.username,
                accessToken,
                refreshToken: userExist.refreshToken
            })
        }
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message))
    }
}

const GetAllUser = async (req: Request, res: Response) => {
    try {
        const allUsers = await UserService.GetAllUser()
        return res.json(allUsers)
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
    }
}

const SignOutUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.body
        const user = await UserService.UpdateUser(id, { refreshToken: "" })
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, user))
    } catch (error) {
        throw new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400)
    }
}

export default { SignUp, SignIn, handleRefreshToken, GetAllUser, SignOutUser }