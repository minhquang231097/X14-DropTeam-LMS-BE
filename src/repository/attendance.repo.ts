import { IAttendance } from "@/models/attendance.model";
import { BaseRepository } from "./base.repo";
import { Model } from "mongoose";

export class AttendanceRepository extends BaseRepository<IAttendance> {
  constructor(model: Model<IAttendance>) {
    super(model);
  }

  async FindAttendanceBySessionId(id: string, page?: number, limit?: number, sortBy?: any | { create_at: -1 }) {
    return this.model
      .find({ session: id })
      .sort(sortBy)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate(["session", "class"]);
  }

  async FindAttendanceByClassId(id: string, page?: number, limit?: number, sortBy?: any | { create_at: -1 }) {
    return this.model
      .find({ class: id })
      .sort(sortBy)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate(["session", "class"]);
  }
}
