import { IAttendance_Student } from "@/models/attendance.student.model";
import { BaseRepository } from "./base.repo";
import { Model } from "mongoose";

export class AttendanceStudentRepository extends BaseRepository<IAttendance_Student> {
  constructor(model: Model<IAttendance_Student>) {
    super(model);
  }
}
