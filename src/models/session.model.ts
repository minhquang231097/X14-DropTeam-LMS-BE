import { RESPONSE_CONFIG } from "@/configs/response.config";
import moment from "moment";
import { Document, Schema, model } from "mongoose";

const sessionSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "courses", required: true },
  class: { type: Schema.Types.ObjectId, ref: "classes" },
  session_code: { type: String, unique: [true, RESPONSE_CONFIG.MESSAGE.SESSION.CODE_EXIST] },
  session_name: { type: String, unique: [true, RESPONSE_CONFIG.MESSAGE.SESSION.NAME_EXIST] },
  desc: String,
  status: { type: String, enum: ["COMPLETED", "UNCOMPLETED"] },
  create_at: {
    type: Date,
    default: Date.now(),
  },
  formated_date: String,
});

enum StatusSS {
  "COMPLETED",
  "UNCOMPLETED",
}

sessionSchema.pre("save", function (next) {
  this.formated_date = moment(this.create_at).format("DD/MM/YYYY");
  next();
});

export interface ISession extends Document {
  course: string;
  class: string;
  session_code: string;
  session_name: string;
  desc: string;
  status: StatusSS;
  create_at: string;
}

export const Session = model<ISession>("sessions", sessionSchema);
