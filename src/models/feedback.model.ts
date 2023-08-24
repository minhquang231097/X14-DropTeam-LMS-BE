import { Document, Schema, model } from "mongoose";

const feedbackSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "courses" },
  student: { type: Schema.Types.ObjectId, ref: "users" },
  rating: Number,
  content: String,
  create_at: { type: Date, default: Date.now() },
});

export interface IFeedback extends Document {
  course: string;
  student: string;
  rating: number;
  content: string;
  create_at: string;
}

export const FeedBack = model<IFeedback>("feedbacks", feedbackSchema);
