import { Model } from "mongoose";
import { BaseRepository } from "./base.repo";
import { ISession } from "@/models/session.model";

export class SessionRepository extends BaseRepository<ISession> {
  constructor(model: Model<ISession>) {
    super(model);
  }
  async FindSessionByCode(session_code: string) {
    const session = await this.model
      .findOne({ session_code })
      .populate(["course", "class"]);
    return session?.toObject();
  }

  async FindSessionByCourseId(id: string) {
    const session = await this.model
      .find({ course: id })
      .populate(["course", "class"]);
    return session;
  }

  async FindSessionByClassId(id: string) {
    const session = await this.model
      .findOne({ class: id })
      .populate(["course", "class"]);
    return session;
  }
}
