import { IUser } from "@/models/user.model";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repo";

export class UserRepository extends BaseRepository<IUser> {
  constructor(model: Model<IUser>) {
    super(model);
  }
}
