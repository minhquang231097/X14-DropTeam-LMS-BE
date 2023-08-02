import { IUser, User } from "@/models/user.model";
import { FindUserDto, UpdateUserDto } from "@/types/user.dto";
import { ObjectId } from "mongoose";

export class UserRepository {
    constructor() { }

    static async CreateOne(user: IUser) {
        const createdUser = await User.create(user)
        return createdUser.toObject()
    }

    static async UpdateUser(id: ObjectId | string, update: UpdateUserDto) {
        const updatedUser = await User.findByIdAndUpdate(id, update, { new: true })
        return updatedUser?.toObject()
    }

    static async FindUserById(id: ObjectId | string) {
        const user = await User.findById(id)
        return user?.toObject()
    }

    static async FindUserByUsername(username: string) {
        const user = await User.findOne({ username })
        return user?.toObject()
    }

    static async FindUserByEmail(email: string) {
        const user = await User.findOne({ email })
        return user?.toObject()
    }

    static async FindUserByCondition(payload: FindUserDto) {
        const user = await User.findOne(payload)
        return user?.toObject()
    }

    static async GetAllUser() {
        const allUser = await User.find()
        return allUser.map((stu) => stu.toObject())
    }

    static async DeleteOneUserById(id: ObjectId | string) {
        const deletedUser = await User.findByIdAndDelete(id)
        return deletedUser?.toObject()
    }

    static async DeleteOneUserByName(name: string) {
        const deletedUser = await User.findOneAndDelete({ name })
        return deletedUser?.toObject()
    }

    static async DeleteOneUserByEmail(email: string) {
        const deletedUser = await User.findOneAndDelete({ email })
        return deletedUser?.toObject()
    }
}