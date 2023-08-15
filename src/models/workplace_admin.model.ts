import moment from "moment";
import { Document, Schema, model } from "mongoose";

const worplace_adminSchema = new Schema({
  workplace: { type: Schema.Types.ObjectId, ref: "workplaces" },
  admin: { type: Schema.Types.ObjectId, ref: "users" },
  create_at: {
    type: Date,
    default: Date.now(),
  },
  formated_date: String,
});

worplace_adminSchema.pre("save", function (next) {
  this.formated_date = moment(this.create_at).format("DD/MM/YYYY");
  next();
});

export interface IWorkplace_Admin extends Document {
  workplace: string;
  admin: string;
  create_at: string;
  formated_date: string;
}

export const Workplace_Admin = model<IWorkplace_Admin>(
  "workplace_admin",
  worplace_adminSchema,
);
