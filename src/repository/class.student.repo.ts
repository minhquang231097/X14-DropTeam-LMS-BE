import { IClass_Student } from "@/models/class.student.model";
import { BaseRepository } from "./base.repo";
import { Model } from "mongoose";

export class ClassStudentRepository extends BaseRepository<IClass_Student> {
  constructor(model: Model<IClass_Student>) {
    super(model);
  }
}
