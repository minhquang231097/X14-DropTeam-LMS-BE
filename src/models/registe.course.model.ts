import moment from "moment";
import { Document, Schema, model } from "mongoose";

const registe_CourseSchema = new Schema({
  fullname: String,
  email: String,
  phone_number: Number,
  course: { type: Schema.Types.ObjectId, ref: "courses" },
  workplace: { type: Schema.Types.ObjectId, ref: "workplaces" },
  student: { type: Schema.Types.ObjectId, ref: "users" },
  note: String,
  create_at: {
    type: Date,
    default: Date.now(),
  },
  formated_date: String,
});

registe_CourseSchema.pre("save", function (next) {
  this.formated_date = moment(this.create_at).format("DD/MM/YYYY");
  next();
});

export interface IRegistedCourse extends Document {
  fullname: string;
  email: string;
  phone_number: number;
  course: string;
  workplace: string;
  note: string;
  student: string;
  create_at: string;
  formated_date: string;
}

export const RegistedCourse = model<IRegistedCourse>(
  "registed_course",
  registe_CourseSchema,
);
