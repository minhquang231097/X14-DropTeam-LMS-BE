import { Document, Schema, model } from "mongoose";

const courseSchema = new Schema({
    workplace: { type: Schema.Types.ObjectId, ref: "workplaces" },
    course_code: { type: String, unique: true },
    title: String,
    image: String,
    session_per_course: { type: String },
    price: String
})

export interface ICourse extends Document {
    workplace: string,
    course_code: string
    title: string,
    image: string,
    session_per_course: string,
    price: string
}

export const Course = model<ICourse>('courses', courseSchema)