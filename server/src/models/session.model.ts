import { Document, Schema, model } from "mongoose";

const sessionSchema = new Schema({
    course: { type: Schema.Types.ObjectId, ref: "courses" },
    session_code: { type: String, unique: true },
    session_name: { type: String, unique: true },
    desc: String
})

export interface ISession extends Document {
    course: string,
    session_code: string,
    session_name: string,
    desc: string
}

export const Session = model<ISession>('sessions', sessionSchema)