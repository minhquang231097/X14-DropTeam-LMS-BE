import { Document, Schema, model } from "mongoose";

const registe_CourseSchema = new Schema({
  fullname: String,
  email: String,
  phone_number: String,
  course: { type: Schema.Types.ObjectId, ref: "courses" },
  workplace: { type: Schema.Types.ObjectId, ref: "workplaces" },
  student: { type: Schema.Types.ObjectId, ref: "users" },
  note: String,
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

export interface IRegistedCourse extends Document {
  fullname: string;
  email: string;
  phone_number: string;
  course: string;
  workplace: string;
  note: string;
  student: string;
  create_at: string;
}

export const RegistedCourse = model<IRegistedCourse>("registed_course", registe_CourseSchema);
