import { IRegistedCourse } from "@/models/registe.course.model";
import { BaseRepository } from "./base.repo";
import { Model } from "mongoose";

export class RegistedCourseRepository extends BaseRepository<IRegistedCourse> {
  constructor(model: Model<IRegistedCourse>) {
    super(model);
  }

  async FindRegistbyCourseId(id: string, page: number, limit: number) {
    return this.model
      .find({ course: id })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(["course", "workplaces", "student"]);
  }

  async FindRegistbyWorkplaceId(id: string) {
    return this.model
      .find({ workplace: id })
      .populate(["course", "workplaces", "student"]);
  }

  async FindRegistbyStudentId(id: string) {
    return this.model
      .find({ student: id })
      .populate(["course", "workplaces", "student"]);
  }
}
