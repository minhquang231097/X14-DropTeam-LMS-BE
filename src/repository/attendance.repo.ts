import { IAttendance } from "@/models/attendance.model";
import { BaseRepository } from "./base.repo";
import { Model, ObjectId } from "mongoose";

export class AttendanceRepository extends BaseRepository<IAttendance>{
    constructor(model: Model<IAttendance>) {
        super(model)
    }

    async FindAttendanceBySessionId(id: ObjectId | string) {
        return await this.model.find({ session: id }).populate(["session", "class"])
    }

    async FindAttendanceByClassId(id: ObjectId | string) {
        return await this.model.find({ class: id }).populate(["session", "class"])
    }
}