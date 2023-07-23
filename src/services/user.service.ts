import { UserRepository } from "@/repository/user.repo";
import { SignUpBody } from "@/types/user/signup";
import bcrypt from "bcryptjs"

const CreateUser = async (payload: SignUpBody) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password, salt);
    const user = await UserRepository.CreateOne({
        fullname: payload.fullname,
        email: payload.email,
        phone_number: payload.phone_number,
        username: payload.username,
        password: hashedPassword,
    })
    return user
}

const GetAllUser = async () => {
    return await UserRepository.GetAllUser()
}

const FindUserByUsername = async (username: string) => {
    return await UserRepository.FindUserByUsername(username)
}

const FindUserByEmail = async (email: string) => {
    return await UserRepository.FindUserByEmail(email)
}

const FindUserById = async (id: string) => {
    return await UserRepository.FindUserById(id)
}

const UpdateUser = async (id: string, payload: any) => {
    return await UserRepository.UpdateUser(id, payload)
}

export default { CreateUser, GetAllUser, FindUserByUsername, UpdateUser, FindUserByEmail, FindUserById }