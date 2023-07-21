import { Document, Schema, model } from "mongoose";

const worplace_adminSchema = new Schema({
    workplace: { type: Schema.Types.ObjectId, ref: "workplaces" },
    admin: { type: Schema.Types.ObjectId, ref: "admins" }
})

export interface IWorkplace_Admin extends Document {
    workplace: string,
    admin: string
}

export const Workplace_Admin = model<IWorkplace_Admin>("workplace_admin", worplace_adminSchema)