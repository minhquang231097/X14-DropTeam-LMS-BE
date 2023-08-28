import { IAttendance } from "@/models/attendance.model";
import { BaseRepository } from "./base.repo";
import { Model } from "mongoose";

export class AttendanceRepository extends BaseRepository<IAttendance> {
  constructor(model: Model<IAttendance>) {
    super(model);
  }

  async FindAttendanceBySessionId(id: string, page: number, limit: number) {
    return await this.model
      .find({ session: id })
      .sort({ create_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(["session", "class"]);
  }

  async FindAttendanceByClassId(id: string, page: number, limit: number) {
    return await this.model
      .find({ class: id })
      .sort({ create_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(["session", "class"]);
  }
}
