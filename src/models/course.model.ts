import { RESPONSE_CONFIG } from "@/configs/response.config";
import moment from "moment";
import { Document, Schema, model } from "mongoose";

const courseSchema = new Schema({
  course_code: { type: String, unique: [true, RESPONSE_CONFIG.MESSAGE.COURSE.CODE_EXIST] },
  title: String,
  image: [String],
  desc: String,
  session_per_course: Number,
  price: Number,
  duration: Number,
  level: Number,
  rate: Number,
  discount: Number,
  workplace: { type: Schema.Types.ObjectId, ref: "workplaces" },
  create_at: {
    type: Date,
    default: Date.now(),
  },
  formated_date: String,
});

courseSchema.pre("save", function (next) {
  this.formated_date = moment(this.create_at).format("DD/MM/YYYY");
  next();
});

export interface ICourse extends Document {
  course_code: string;
  title: string;
  image: [string];
  session_per_course: number;
  price: number;
  desc: string;
  duration: number;
  level: number;
  rate: number;
  discount: number;
  workplace: string;
  create_at: string;
  formated_date: string;
}

export const Course = model<ICourse>("courses", courseSchema);
