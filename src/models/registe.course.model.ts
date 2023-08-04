import { Document, Schema, model } from "mongoose";

const registe_CourseSchema = new Schema({
  fullname: String,
  email: String,
  phone_number: Number,
  course: { type: Schema.Types.ObjectId, ref: "courses" },
  workplace: { type: Schema.Types.ObjectId, ref: "workplaces" },
  note: String,
  student: { type: Schema.Types.ObjectId, ref: "students" },
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

export interface IRegistedCourse extends Document {
  fullname: string;
  email: string;
  phone_number: number;
  course: string;
  workplace: string;
  note?: string;
  student?: string;
  create_at?: string;
}

export const RegistedCourse = model<IRegistedCourse>(
  "registed_course",
  registe_CourseSchema,
);
