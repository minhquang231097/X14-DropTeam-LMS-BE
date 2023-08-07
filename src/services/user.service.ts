import { User } from "@/models/user.model";
import { UserRepository } from "@/repository/user.repo";
import bcrypt from "bcryptjs"

const userRepository = new UserRepository(User)

const CreateUser = async (payload: any) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password, salt);
    const user = await userRepository.Create({
        ...payload,
        password: hashedPassword,
    })
    return user
}

const GetAllUser = async (page: number, limit: number) => {
    return await userRepository.FindAllInfoAndPagination(page, limit)
}

const GetUserByUsername = async (username: string) => {
    return await userRepository.FindByCondition({ username })
}

const GetUserByEmail = async (email: string) => {
    return await userRepository.FindByCondition({ email })
}

const GetUserById = async (id:  string) => {
    return await userRepository.FindById(id)
}

const GetUserByCondition = async (filter: any) => {
    return await userRepository.FindByCondition(filter)
}

const SearchUserByCondition = async (page: number, limit: number, field?: any, filter?: any) => {
    return await userRepository.Search(page, limit, null,field, filter)
}

const UpdateUserById = async (id:  string, payload: any) => {
    return await userRepository.FindByIdAndUpdate(id, payload)
}

const UpdateUserByCondition = async (filter: any, payload: any) => {
    return await userRepository.UpdateMany(filter, payload)
}

const DeleteUserById = async (id:  string) => {
    return await userRepository.DeleteOne(id)
}

const DeleteUserByCondition = async (filter: any) => {
    return await userRepository.DeleteByCondition(filter)
}

export default { CreateUser,SearchUserByCondition, GetAllUser, GetUserByUsername, UpdateUserById, GetUserByEmail, GetUserById, DeleteUserById, DeleteUserByCondition, UpdateUserByCondition, GetUserByCondition }