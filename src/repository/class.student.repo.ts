import { IClass_Student } from "@/models/class.student.model";
import { BaseRepository } from "./base.repo";
import { Model } from "mongoose";

export class ClassStudentRepository extends BaseRepository<IClass_Student> {
  constructor(model: Model<IClass_Student>) {
    super(model);
  }
  async FindByClassId(id: string, page?: number, limit?: number, sortBy?: any | { create_at: -1 }, populate?: any) {
    return this.model
      .find({ class: id })
      .sort(sortBy)
      .populate(populate)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
  }

  async CountStudentInClass(class_id: string): Promise<number> {
    return this.model.count({ class: class_id });
  }
}
