import { Document, Schema, model } from "mongoose";

const attendanceSchema = new Schema({
    session: { type: Schema.Types.ObjectId, ref: "sessions" },
    class: { type: Schema.Types.ObjectId, ref: "classes" },
    day: String,
    class_size: Number,
    absence: String
})

export interface IAttendance extends Document {
    session?: string,
    class?: string,
    day: string,
    absence: string,
    class_size: number
}

export const Attendance = model<IAttendance>("attendances", attendanceSchema)