import { Document, Schema, model } from "mongoose";

const attendance_studentSchema = new Schema({
    attendance: { type: Schema.Types.ObjectId, ref: "attendances" },
    student: { type: Schema.Types.ObjectId, ref: "students" }
})

export interface IAttendance_Student extends Document {
    attendance: string,
    student: string
}

export const Attendace_Student = model<IAttendance_Student>("attendance_student", attendance_studentSchema)