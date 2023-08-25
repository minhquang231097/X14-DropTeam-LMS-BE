import { RESPONSE_CONFIG } from "@/configs/response.config";
import { Document, Schema, model } from "mongoose";

const workplaceSchema = new Schema({
  name: { type: String, unique: true, trim: true },
  address: { type: String, trim: true },
  status: { type: String, enum: ["ON", "OFF", "UPCOMING"] },
  workplace_code: { type: String, unique: true, trim: true },
  create_at: { type: Date, default: Date.now() },
});

enum StatusWP {
  "ON",
  "OFF",
  "UPCOMING",
}

workplaceSchema.pre("save", function (next) {
  this.workplace_code = this.workplace_code?.toUpperCase();
  next();
});

export interface IWorkplace extends Document {
  name: string;
  address: string;
  status: StatusWP;
  workplace_code: string;
}

export const Workplace = model<IWorkplace>("workplaces", workplaceSchema);
