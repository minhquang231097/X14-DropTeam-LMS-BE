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
    payload: IClass,
  ) {
    return await this.model.create({ ...payload, mentor, workplace, course });
  }

  async FindClassByCode(code: string) {
    return await Class.findOne({ class_code: `${code}` }).populate([
      "mentor",
      "workplace",
      "course",
    ]);
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

  async FindClassByCourseId(id: string) {
    return await Class.find({ course: `${id}` }).populate([
      "mentor",
      "workplace",
      "course",
    ]);
  }
}
