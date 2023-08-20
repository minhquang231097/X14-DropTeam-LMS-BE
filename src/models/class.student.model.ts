import { Document, Schema, model } from "mongoose";

const class_studentSchema = new Schema({
  class: { type: Schema.Types.ObjectId, ref: "classes" },
  student: { type: Schema.Types.ObjectId, ref: "users" },
  status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

export interface IClass_Student extends Document {
  class: string;
  student: string;
  status: string;
  create_at: string;
}

export const Class_Student = model<IClass_Student>("class_student", class_studentSchema);
