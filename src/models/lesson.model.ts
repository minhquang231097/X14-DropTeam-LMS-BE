import { Document, Schema, model } from "mongoose";

const lessonSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "courses" },
  title: String,
  content: String,
  no: Number,
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

export interface ILesson extends Document {
  course: string;
  title: string;
  content: string;
  no: number;
  create_at: string;
}

export const Lesson = model<ILesson>("lessons", lessonSchema);
