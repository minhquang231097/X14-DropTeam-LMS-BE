import { Class, IClass } from "@/models/class.model";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repo";

export class ClassRepository extends BaseRepository<IClass> {
  constructor(model: Model<IClass>) {
    super(model);
  }

  async CreateClass(mentor: string, workplace: string, course: string, end_at: Date, payload: IClass) {
    return await this.model.create({
      ...payload,
      mentor,
      workplace,
      course,
      end_at,
    });
  }

  async FindClassByCode(code: string, populate?: any | null) {
    return await this.model
      .findOne({ class_code: code })
      .populate(["mentor", "workplace", { path: "course", populate: { path: "workplace" } }]);
  }

  async FindClassByMentorId(id: string) {
    return await this.model
      .find({ mentor: `${id}` })
      .populate(["mentor", "workplace", { path: "course", populate: { path: "workplace" } }]);
  }

  async FindClassByWorkplaceId(id: string) {
    return await this.model
      .find({ workplace: `${id}` })
      .populate(["mentor", "workplace", { path: "course", populate: { path: "workplace" } }]);
  }

  async FindClassByCourseId(id: string, page?: any, limit?: any) {
    return await this.model
      .find({ course: `${id}` })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(["mentor", "workplace", { path: "course", populate: { path: "workplace" } }]);
  }
}
