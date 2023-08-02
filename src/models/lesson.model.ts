import { Document, Schema, model } from "mongoose";

const lessonSchema = new Schema({
    session: { type: Schema.Types.ObjectId, ref: "sessions" },
    title: String,
    content: String,
    no: Number
})

export interface ILesson extends Document {
    session: string,
    title: string,
    content: string
    no: number
}

export const Lesson = model<ILesson>("lessons", lessonSchema)