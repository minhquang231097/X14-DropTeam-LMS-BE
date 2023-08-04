import { IUser, User } from "@/models/user.model";
import { FindUserDto, UpdateUserDto } from "@/types/user";
import { Model, ObjectId } from "mongoose";
import { BaseRepository } from "./base.repo";

export class UserRepository extends BaseRepository<IUser> {
    constructor(model: Model<IUser>) {
        super(model)
    }
}