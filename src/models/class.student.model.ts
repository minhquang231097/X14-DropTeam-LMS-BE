import moment from "moment";
import { Document, Schema, model } from "mongoose";

const class_studentSchema = new Schema({
  class: { type: Schema.Types.ObjectId, ref: "classes" },
  student: { type: Schema.Types.ObjectId, ref: "students" },
  create_at: {
    type: Date,
    default: Date.now(),
  },
  formated_date: String,
});

class_studentSchema.pre("save", function (next) {
  this.formated_date = moment(this.create_at).format("DD/MM/YYYY");
  next();
});

export interface IClass_Student extends Document {
  class: string;
  student: string;
  create_at: string;
  formated_date: string;
}

export const Class_Student = model<IClass_Student>(
  "class_student",
  class_studentSchema,
);
