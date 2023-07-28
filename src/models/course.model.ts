import { Document, Schema, model } from "mongoose";

const courseSchema = new Schema({
    course_code: { type: String, unique: true },
    title: { type: String, unique: true },
<<<<<<< HEAD
    image: [String],
=======
    image: String,
>>>>>>> d99739771d63030edf8b7ab3f2d56cf2ca6d7d7f
    desc: String,
    lesson_list: [{ type: Schema.Types.ObjectId, ref: "lessons" }],
    session_per_course: Number,
    price: Number
})

export interface ICourse extends Document {
    course_code: string
    title: string,
<<<<<<< HEAD
    image?: [string],
    session_per_course: number,
    price: number,
    desc: string,
    lesson_list?: [string]
=======
    image: string,
    desc: string,
    lesson_list: [string]
    session_per_course: number,
    price: number,
>>>>>>> d99739771d63030edf8b7ab3f2d56cf2ca6d7d7f
}

export const Course = model<ICourse>('courses', courseSchema)