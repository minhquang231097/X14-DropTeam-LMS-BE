import moment from "moment";
import { Document, Schema, model } from "mongoose";

const attendanceSchema = new Schema({
  session: { type: Schema.Types.ObjectId, ref: "sessions" },
  class: { type: Schema.Types.ObjectId, ref: "classes" },
  day: Number,
  class_size: Number,
  absence: String,
  create_at: {
    type: Date,
    default: Date.now(),
  },
  formated_date: String,
});

attendanceSchema.pre("save", function (next) {
  this.formated_date = moment(this.create_at).format("DD/MM/YYYY");
  next();
});

export interface IAttendance extends Document {
  session: string;
  class: string;
  day: number;
  absence: string;
  class_size: number;
  create_at: string;
  formated_date: string;
}

export const Attendance = model<IAttendance>("attendances", attendanceSchema);
