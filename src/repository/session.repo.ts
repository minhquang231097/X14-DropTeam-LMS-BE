import { Model } from "mongoose";
import { BaseRepository } from "./base.repo";
import { ISession } from "@/models/session.model";

export class SessionRepository extends BaseRepository<ISession> {
  constructor(model: Model<ISession>) {
    super(model);
  }
  async FindSessionByCode(session_code: string) {
    const session = await this.model.findOne({ session_code }).populate([{ path: "course", populate: [{ path: "workplace" }] }, "class"]);
    return session?.toObject();
  }

  async FindSessionByCourseId(id: string, page?: any, limit?: any) {
    const session = await this.model
      .find({ course: id })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate([{ path: "course" }, "class"]);
    return session;
  }

  async FindSessionByClassId(id: string, page?: any, limit?: any) {
    const session = await this.model
      .find({ class: id })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate([{ path: "course" }, "class"]);
    return session;
  }
}
