import { UserRepository } from "@/repository/user.repo";
import bcrypt from "bcryptjs"
import { ObjectId } from "mongoose";

const CreateUser = async (payload: any) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password, salt);
    const user = await UserRepository.CreateOne({
        ...payload,
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

const FindUserById = async (id: ObjectId | string) => {
    return await UserRepository.FindUserById(id)
}

const UpdateUser = async (id: ObjectId | string, payload: any) => {
    return await UserRepository.UpdateUser(id, payload)
}

export default { CreateUser, GetAllUser, FindUserByUsername, UpdateUser, FindUserByEmail, FindUserById }