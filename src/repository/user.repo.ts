import { IUser } from "@/models/user.model";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repo";

export class UserRepository extends BaseRepository<IUser> {
  constructor(model: Model<IUser>) {
    super(model);
  }

  async FindAllUserByRole(role: string, page?: any, limit?: any, sortBy?: any) {
    const query = {
      role: { $regex: new RegExp(role, "i") },
    };
    return this.model
      .find(query)
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-__v -password -refreshToken");
  }

  async SearchUser(searchTerm?: string, page?: number, limit?: number, sortBy?: any) {
    const query = {
      $or: [
        { username: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { fullname: { $regex: searchTerm, $options: "i" } },
      ],
    };
    return this.model
      .find(query)
      .sort(sortBy)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .select("-__v -password -refreshToken");
  }

  async SearchUserByConditionAndRole(searchTerm?: string, role?: string, page?: number, limit?: number, sortBy?: any) {
    const query = {
      $and: [
        {
          $or: [
            { username: { $regex: searchTerm, $options: "i" } },
            { email: { $regex: searchTerm, $options: "i" } },
            { fullname: { $regex: searchTerm, $options: "i" } },
          ],
        },
        { role: { $regex: role, $options: "i" } },
      ],
    };
    return this.model
      .find(query)
      .sort(sortBy)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .select("-__v -password -refreshToken");
  }

  async FindAllUser(page?: number, limit?: number, sortBy?: any) {
    return this.model
      .find()
      .sort(sortBy)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .select("-__v -password -refreshToken");
  }
}
