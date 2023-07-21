import { Document, Schema, model } from "mongoose";

const adminSchema = new Schema({
    fullname: {
        type: String, unique: true
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

export interface IAdmin extends Document {
    fullname: string,
    email: string,
    phone_number: string,
    username: string,
    password: string,
    create_at?: Date
}

export const Admin = model<IAdmin>('admins', adminSchema)
