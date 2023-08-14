import { Class, IClass } from "@/models/class.model";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repo";

export class ClassRepository extends BaseRepository<IClass> {
  constructor(model: Model<IClass>) {
    super(model);
  }

  async CreateClass(
    mentor: string,
    workplace: string,
    course: string,
    end_at: string,
    payload: IClass,
  ) {
    return await this.model.create({
      ...payload,
      mentor,
      workplace,
      course,
      end_at,
    });
  }

  async FindClassByCode(code: string, populate?: any | null) {
    return await Class.findOne({ class_code: code }).populate(populate);
  }

  async FindClassByMentorId(id: string) {
    return await Class.find({ mentor: `${id}` }).populate([
      "mentor",
      "workplace",
      "course",
    ]);
  }

  async FindClassByWorkplaceId(id: string) {
    return await Class.find({ workplace: `${id}` }).populate([
      "mentor",
      "workplace",
      "course",
    ]);
  }

  async FindClassByCourseId(id: string, page: number, limit: number) {
    return await Class.find({ course: `${id}` })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(["mentor", "workplace", "course"]);
  }
}
