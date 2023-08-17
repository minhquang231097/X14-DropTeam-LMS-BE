import { RESPONSE_CONFIG } from "@/configs/response.config";
import { Document, Schema, model } from "mongoose";

const sessionSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "courses", required: true },
  class: { type: Schema.Types.ObjectId, ref: "classes" },
  session_code: { type: String, unique: [true, RESPONSE_CONFIG.MESSAGE.SESSION.CODE_EXIST] },
  desc: String,
  status: { type: String, enum: ["COMPLETED", "UNCOMPLETED"] },
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

enum StatusSS {
  "COMPLETED",
  "UNCOMPLETED",
}
export interface ISession extends Document {
  course: string;
  class: string;
  session_code: string;
  desc: string;
  status: StatusSS;
  create_at: string;
}

export const Session = model<ISession>("sessions", sessionSchema);
