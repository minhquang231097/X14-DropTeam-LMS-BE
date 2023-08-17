import { RESPONSE_CONFIG } from "@/configs/response.config";
import moment from "moment";
import { Document, Schema, model } from "mongoose";

const classSchema = new Schema({
  mentor: { type: Schema.Types.ObjectId, ref: "users" },
  workplace: { type: Schema.Types.ObjectId, ref: "workplaces" },
  course: { type: Schema.Types.ObjectId, ref: "courses" },
  class_code: { type: String, unique: [true, RESPONSE_CONFIG.MESSAGE.CLASS.CODE_EXIST] },
  start_at: Date,
  end_at: Date,
  total_hours: Number,
  total_session: Number,
  hour_per_session: Number,
  schedule: [Date],
  class_size: Number,
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

export interface IClass extends Document {
  mentor: string;
  workplace: string;
  course: string;
  class_code: string;
  start_at: Date;
  end_at: Date;
  total_hours: number;
  total_session: number;
  hour_per_session: number;
  schedule: [Date];
  class_size: number;
}

export const Class = model<IClass>("classes", classSchema);
