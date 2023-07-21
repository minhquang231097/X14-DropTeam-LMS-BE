import { Document, Schema, Types, model } from "mongoose";

const mentorSchema = new Schema({
    class: {
        type: Schema.Types.ObjectId, ref: 'Class'
    },
    fullname: {
        type: String, required: true, unique: true
    },
    email: {
        type: String, unique: true
    },
    phone_number: {
        type: String, unique: true
    },
    username: {
        type: String, unique: true
    },
    password: String,
    create_at: {
        type: Date, default: Date.now()
    }
})

export interface IMentor extends Document {
    class?: Types.ObjectId,
    fullname: string,
    email: string,
    phone_number: string,
    username: string,
    password: string,
    create_at?: Date
}

export const Mentor = model<IMentor>('mentors', mentorSchema)
