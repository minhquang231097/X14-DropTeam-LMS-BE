import { IRegistedCourse } from "@/models/registe.course.model";
import { BaseRepository } from "./base.repo";
import { Model } from "mongoose";

export class RegistedCourseRepository extends BaseRepository<IRegistedCourse> {
  constructor(model: Model<IRegistedCourse>) {
    super(model);
  }

  async FindRegistbyCourseId(id: string, page?: number, limit?: number, sortBy?: any | { create_at: -1 }) {
    return this.model
      .find({ course: id })
      .sort(sortBy)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate(["course", "workplace", { path: "student", select: "-__v -password -refreshToken" }]);
  }

  async FindRegistbyWorkplaceId(id: string, page?: number, limit?: number, sortBy?: any | { create_at: -1 }) {
    return this.model
      .find({ workplace: id })
      .sort(sortBy)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate(["course", "workplace", { path: "student", select: "-__v -password -refreshToken" }]);
  }

  async FindRegistbyStudentId(id: string, page?: number, limit?: number, sortBy?: any | { create_at: -1 }) {
    return this.model
      .find({ student: id })
      .sort(sortBy)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate(["course", "workplace", { path: "student", select: "-__v -password -refreshToken" }]);
  }
}
