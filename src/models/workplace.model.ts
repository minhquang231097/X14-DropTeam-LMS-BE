import moment from "moment";
import { Document, Schema, model } from "mongoose";

const workplaceSchema = new Schema({
  name: { type: String, unique: true },
  address: String,
  status: { type: String, enum: ["ON", "OFF", "UPCOMING"] },
  workplace_code: { type: String, unique: true },
  create_at: {
    type: Date,
    default: Date.now(),
  },
  formated_date: String,
});

enum StatusWP {
  "ON",
  "OFF",
  "UPCOMING",
}

workplaceSchema.pre("save", function (next) {
  this.formated_date = moment(this.create_at).format("DD/MM/YYYY");
  next();
});

export interface IWorkplace extends Document {
  name: string;
  address: string;
  status: StatusWP;
  workplace_code: string;
  formated_date: string;
}

export const Workplace = model<IWorkplace>("workplaces", workplaceSchema);
