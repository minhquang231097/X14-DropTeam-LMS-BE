import { Document, Schema, model } from "mongoose";

const workplaceSchema = new Schema({
    name: { type: String, unique: true },
    address: String,
    status: { type: String, enum: ["ON", "OFF", "UPCOMING"] },
    workplace_code: { type: String, unique: true },
    image: String
})

enum StatusWP {
    "ON", "OFF", "UPCOMING"
}

export interface IWorkplace extends Document {
    name: string,
    address: string,
    status: StatusWP,
    workplace_code: string,
    image: string
}

export const Workplace = model<IWorkplace>("workplaces", workplaceSchema)