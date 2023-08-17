import { Document, Schema, model } from "mongoose";

const attendanceSchema = new Schema({
  session: { type: Schema.Types.ObjectId, ref: "sessions" },
  class: { type: Schema.Types.ObjectId, ref: "classes" },
  day: Number,
  class_size: Number,
  absence: Number,
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

export interface IAttendance extends Document {
  session: string;
  class: string;
  day: number;
  absence: number;
  class_size: number;
  create_at: string;
}

export const Attendance = model<IAttendance>("attendances", attendanceSchema);
