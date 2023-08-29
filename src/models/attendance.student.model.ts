import { Document, Schema, model } from "mongoose";

enum statusStudent {
  "PRESENT",
  "ABSENT WITH PERMISSION",
  "ABSENT WITHOUT PERMISSION",
  "RESERVE",
}

const attendance_studentSchema = new Schema({
  attendance: { type: Schema.Types.ObjectId, ref: "attendances" },
  student: { type: Schema.Types.ObjectId, ref: "users" },
  status: { type: String, enum: statusStudent },
  score: Number,
  comment: String,
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

export interface IAttendance_Student extends Document {
  attendance: string;
  student: string;
  score: number;
  status: statusStudent;
  comment: string;
  create_at: string;
}

export const Attendace_Student = model<IAttendance_Student>("attendance_student", attendance_studentSchema);
