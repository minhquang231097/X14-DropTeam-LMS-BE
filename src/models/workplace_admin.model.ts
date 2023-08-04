import { Document, Schema, model } from "mongoose";

const worplace_adminSchema = new Schema({
  workplace: { type: Schema.Types.ObjectId, ref: "workplaces" },
  admin: { type: Schema.Types.ObjectId, ref: "admins" },
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

export interface IWorkplace_Admin extends Document {
  workplace: string;
  admin: string;
  create_at?: string;
}

export const Workplace_Admin = model<IWorkplace_Admin>(
  "workplace_admin",
  worplace_adminSchema,
);
