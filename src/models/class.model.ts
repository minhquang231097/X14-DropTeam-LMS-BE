import { RESPONSE_CONFIG } from "@/configs/response.config";
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
  schedule: [Number],
  class_size: Number,
  status: { type: String, enum: ["ON", "OFF", "UPCOMING"] },
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

classSchema.pre<IClass>("save", function (this: IClass, next: Function) {
  if (!this.class_code) {
    const currentYear = new Date().getFullYear().toString().substr(-2);
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    this.class_code = "CLS" + currentYear + randomCode;
  }
  next();
});

enum StatusC {
  "ON",
  "OFF",
  "UPCOMING",
}

export interface IClass extends Document {
  mentor: string;
  workplace: string;
  course: string;
  class_code: string;
  start_at: Date;
  end_at: Date;
  status: StatusC;
  total_hours: number;
  total_session: number;
  schedule: [number];
  class_size: number;
}

export const Class = model<IClass>("classes", classSchema);
