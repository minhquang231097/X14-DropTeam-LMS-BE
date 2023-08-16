import { RESPONSE_CONFIG } from "@/configs/response.config";
import moment from "moment";
import { Document, Schema, model } from "mongoose";

const workplaceSchema = new Schema({
  name: { type: String, unique: [true, RESPONSE_CONFIG.MESSAGE.WORKPLACE.WORKPLACE_EXIST] },
  address: String,
  status: { type: String, enum: ["ON", "OFF", "UPCOMING"] },
  workplace_code: { type: String, unique: [true, "Workplace code exist"] },
  create_at: { type: Date, default: Date.now() },
});

enum StatusWP {
  "ON",
  "OFF",
  "UPCOMING",
}

export interface IWorkplace extends Document {
  name: string;
  address: string;
  status: StatusWP;
  workplace_code: string;
}

export const Workplace = model<IWorkplace>("workplaces", workplaceSchema);
