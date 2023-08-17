import { RESPONSE_CONFIG } from "@/configs/response.config";
import { Document, Schema, model } from "mongoose";

const courseSchema = new Schema({
  course_code: { type: String, unique: [true, RESPONSE_CONFIG.MESSAGE.COURSE.CODE_EXIST] },
  title: String,
  image: [String],
  desc: String,
  session_per_course: Number,
  price: Number,
  level: { type: String, enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED"] },
  rate: Number,
  discount: { type: Number, default: 0 },
  workplace: { type: Schema.Types.ObjectId, ref: "workplaces" },
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

export interface ICourse extends Document {
  course_code: string;
  title: string;
  image: [string];
  session_per_course: number;
  price: number;
  desc: string;
  level: string;
  rate: number;
  discount: number;
  workplace: string;
  create_at: string;
}

export const Course = model<ICourse>("courses", courseSchema);
