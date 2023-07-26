import { Document, Schema, model } from "mongoose";

const courseSchema = new Schema({
    course_code: { type: String, unique: true },
    title: String,
    image: [String],
    desc: String,
    lesson_list: [{ type: Schema.Types.ObjectId, ref: "lessons" }],
    session_per_course: Number,
    price: Number
})

export interface ICourse extends Document {
    course_code: string
    title: string,
    image: [string],
    session_per_course: number,
    price: number,
    desc: string,
    lesson_list: [string]
}

export const Course = model<ICourse>('courses', courseSchema)