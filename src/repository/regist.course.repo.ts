import { IRegistedCourse } from "@/models/registe.course.model";
import { BaseRepository } from "./base.repo";
import { Model } from "mongoose";

export class RegistedCourseRepository extends BaseRepository<IRegistedCourse> {
  constructor(model: Model<IRegistedCourse>) {
    super(model);
  }

  async FindRegistbyCourseId(id: string, page?: any, limit?: any) {
    return await this.model
      .find({ course: id })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(["course", "workplace", "student"]);
  }

  async FindRegistbyWorkplaceId(id: string, page: number, limit: number) {
    return await this.model
      .find({ workplace: id })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(["course", "workplace", "student"]);
  }

  async FindRegistbyStudentId(id: string) {
    return this.model
      .find({ student: id })
      .populate(["course", "workplace", "student"]);
  }
}
