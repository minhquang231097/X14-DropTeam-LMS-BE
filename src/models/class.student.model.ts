import { Document, Schema, model } from "mongoose";

const class_studentSchema = new Schema({
  class: { type: Schema.Types.ObjectId, ref: "classes" },
  student: { type: Schema.Types.ObjectId, ref: "users" },
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

export interface IClass_Student extends Document {
  class: string;
  student: string;
  create_at: string;
}

export const Class_Student = model<IClass_Student>("class_student", class_studentSchema);
