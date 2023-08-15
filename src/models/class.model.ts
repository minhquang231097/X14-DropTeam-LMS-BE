import moment from "moment";
import { Document, Schema, model } from "mongoose";

const classSchema = new Schema({
  mentor: { type: Schema.Types.ObjectId, ref: "users" },
  workplace: { type: Schema.Types.ObjectId, ref: "workplaces" },
  course: { type: Schema.Types.ObjectId, ref: "courses" },
  class_code: { type: String, unique: true },
  session_per_class: Number,
  start_at: String,
  end_at: String,
  total_hours: Number,
  total_session: Number,
  session_per_week: Number,
  hour_per_session: Number,
  schedule: [Number],
  class_size: Number,
  create_at: {
    type: Date,
    default: Date.now(),
  },
  formated_date: String,
});

classSchema.pre("save", function (next) {
  this.formated_date = moment(this.create_at).format("DD/MM/YYYY");
  next();
});

export interface IClass extends Document {
  mentor: string;
  workplace: string;
  course: string;
  class_code: string;
  start_at: string;
  end_at: string;
  total_hours: number;
  total_session: number;
  session_per_class: number;
  session_per_week: number;
  hour_per_session: number;
  schedule: [number];
  class_size: number;
  formated_date: string;
}

export const Class = model<IClass>("classes", classSchema);
