import { Document, Schema, model } from "mongoose";

const registedCourseSchema = new Schema({
    fullname: String,
    email: String,
    phone_number: String,
    course: { type: Schema.Types.ObjectId, ref: "courses" },
    workplace: { type: Schema.Types.ObjectId, ref: "workplaces" },
    note: String,
    student: { type: Schema.Types.ObjectId, ref: "students" }
})

export interface IRegistedCourse extends Document {
    fullname: string,
    email: string,
    phone_number: string,
    course: string,
    workplace: string,
    note?: string,
    student?: string
}

export const RegistedCourse = model<IRegistedCourse>("registed_course", registedCourseSchema)