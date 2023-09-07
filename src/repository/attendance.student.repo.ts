import { IAttendance_Student } from "@/models/attendance.student.model";
import { BaseRepository } from "./base.repo";
import { Model } from "mongoose";

export class AttendanceStudentRepository extends BaseRepository<IAttendance_Student> {
  constructor(model: Model<IAttendance_Student>) {
    super(model);
  }
  async FindAllStudentInAttendance(attendance_id: string, page?: any, limit?: any, sortBy?: any) {
    return this.model
      .find({ attendance: attendance_id })
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate([{ path: "student", select: "-__v -password -refreshToken" }, "session", "class"]);
  }
}
