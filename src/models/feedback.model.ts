import moment from "moment";
import { Document, Schema, model } from "mongoose";

const feedbackSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "courses" },
  student: { type: Schema.Types.ObjectId, ref: "students" },
  rating: String,
  content: String,
  create_at: { type: Date, default: Date.now() },
  formated_date: String,
});

feedbackSchema.pre("save", function (next) {
  this.formated_date = moment(this.create_at).format("DD/MM/YYYY");
  next();
});

export interface IFeedback extends Document {
  course: string;
  student: string;
  rating: string;
  content: string;
  create_at?: string;
  formated_date?: string;
}

export const FeedBack = model<IFeedback>("feedbacks", feedbackSchema);
