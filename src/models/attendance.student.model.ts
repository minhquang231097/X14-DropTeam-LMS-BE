import moment from "moment";
import { Document, Schema, model } from "mongoose";

const attendance_studentSchema = new Schema({
  attendance: { type: Schema.Types.ObjectId, ref: "attendances" },
  student: { type: Schema.Types.ObjectId, ref: "students" },
  score: String,
  comment: String,
  create_at: {
    type: Date,
    default: Date.now(),
  },
  formated_date: String,
});

attendance_studentSchema.pre("save", function (next) {
  this.formated_date = moment(this.create_at).format("DD/MM/YYYY");
  next();
});

export interface IAttendance_Student extends Document {
  attendance: string;
  student: string;
  score: string;
  comment: string;
  create_at: string;
  formated_date: string;
}

export const Attendace_Student = model<IAttendance_Student>(
  "attendance_student",
  attendance_studentSchema,
);
