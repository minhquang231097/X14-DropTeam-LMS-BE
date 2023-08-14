import moment from "moment";
import { Document, model, Schema } from "mongoose";
import { RESPONSE_CONFIG } from "@/configs/response.config";

const userSchema = new Schema({
  fullname: String,
  email: { type: String, unique: [true, RESPONSE_CONFIG.MESSAGE.USER.EMAIL_ERROR] },
  phone_number: { type: String, unique: [true, RESPONSE_CONFIG.MESSAGE.USER.PHONE_ERROR] },
  username: { type: String, unique: [true, RESPONSE_CONFIG.MESSAGE.USER.USERNAME_ERROR] },
  password: String,
  role: { type: String, enum: ["STUDENT", "MENTOR", "ADMIN"] },
  refreshToken: String,
  dob: String,
  gender: String,
  address: String,
  create_at: { type: Date, default: Date.now(), },
  formated_date: String,
});

userSchema.pre("save", function (next) {
  this.formated_date = moment(this.create_at).format("DD/MM/YYYY");
  next();
});

export interface IUser extends Document {
  fullname: string;
  email: string;
  phone_number: string;
  username: string;
  password: string;
  refreshToken: string;
  create_at: string;
  role: string;
  dob: string;
  gender: string;
  address: string;
  formated_date: string;
}

export const User = model<IUser>("users", userSchema);
