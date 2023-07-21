import { Document, Schema, model } from "mongoose";

const attendanceSchema = new Schema({
    session: { type: Schema.Types.ObjectId, ref: "sessions" },
    class: { type: Schema.Types.ObjectId, ref: "classes" },
    day: String,
    class_size: String,
    absence: String
})

export interface IAttendance extends Document {
    session?: string,
    class?: string,
    day: string,
    absence: string
}

export const Attendance = model<IAttendance>("attendances", attendanceSchema)