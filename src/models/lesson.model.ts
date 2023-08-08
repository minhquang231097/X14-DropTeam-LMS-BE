import moment from "moment";
import { Document, Schema, model } from "mongoose";

const lessonSchema = new Schema({
  session: { type: Schema.Types.ObjectId, ref: "sessions" },
  title: String,
  content: String,
  no: Number,
  create_at: {
    type: Date,
    default: Date.now(),
  },
  formated_date: String,
});

lessonSchema.pre("save", function (next) {
  this.formated_date = moment(this.create_at).format("DD/MM/YYYY");
  next();
});

export interface ILesson extends Document {
  session: string;
  title: string;
  content: string;
  no: number;
  create_at?: string;
  formated_date: string;
}

export const Lesson = model<ILesson>("lessons", lessonSchema);
