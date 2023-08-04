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
  role: { type: String, enum: ["STUDENT", "MENTOR", "ADMIN"] },
  refreshToken: String,
  dob: String,
  gender: String,
  address: String,
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
  role?: string,
  dob: string,
  gender: string,
  address: string,
  create_at?: string
}

export const User = model<IUser>('users', userSchema)
