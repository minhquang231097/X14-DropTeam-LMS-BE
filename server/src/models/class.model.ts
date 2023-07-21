import { Document, Schema, model } from "mongoose";

const classSchema = new Schema({
    mentor: { type: Schema.Types.ObjectId, ref: "mentors" },
    workplace: { type: Schema.Types.ObjectId, ref: "workplaces" },
    course: { type: Schema.Types.ObjectId, ref: "courses" },
    class_code: { type: String, unique: true },
    start_at: String,
    end_at: String,
    expected_time_start: String,
    hour_per_class: String,
    schedule: String,
    class_size: String
})

export interface IClass extends Document {
    mentor: string,
    workplace: string,
    course: string,
    class_code: string,
    start_at?: string,
    end_at?: string,
    expected_time_start?: string,
    hour_per_class?: string,
    schedule: string,
    class_size?: string
}

export const Class = model<IClass>("classes", classSchema)