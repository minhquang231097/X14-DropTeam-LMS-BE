import { Document, model, Schema } from "mongoose";

const userSchema = new Schema({
  fullname: String,
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
  role: { type: String, enum: ["STUDENT", "MENTOR", "ADMIN"], default: "STUDENT" },
  refreshToken: String,
  create_at: {
    type: Date, default: Date.now()
  }
})

export interface IUser extends Document {
  fullname: string,
  email: string,
  phone_number: string,
  username: string,
  password: string,
  refreshToken?: string,
  create_at?: Date,
  role?: string
}

export const User = model<IUser>('users', userSchema)
