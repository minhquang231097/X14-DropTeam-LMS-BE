import { Document, Schema, model } from "mongoose";

const workplaceSchema = new Schema({
    name: String,
    address: String,
    status: { type: String, enum: ["ON", "OFF", "UPCOMING"], default: "ON" },
    workplace_code: { type: String, unique: true }
})

export interface IWorkplace extends Document {
    name: string,
    address: string,
    status: string,
    workplace_code: string
}

export const Workplace = model<IWorkplace>("workplaces", workplaceSchema)