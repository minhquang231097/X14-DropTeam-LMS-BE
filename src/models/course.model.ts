import { Document, Schema, model } from "mongoose";

const courseSchema = new Schema({
    course_code: { type: String, unique: true },
    title: { type: String, unique: true },
    image: [String],
    desc: String,
    lesson_list: [{ type: Schema.Types.ObjectId, ref: "lessons" }],
    session_per_course: Number,
    price: Number
})

export interface ICourse extends Document {
    course_code: string
    title: string,
    image?: [string],
    desc: string,
    lesson_list: [string]
    session_per_course: number,
    price: number,
}

export const Course = model<ICourse>('courses', courseSchema)