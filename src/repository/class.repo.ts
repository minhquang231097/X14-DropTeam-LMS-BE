import { IClass } from "@/models/class.model";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repo";
import { CreateClassDto } from "@/types/class";

export class ClassRepository extends BaseRepository<IClass> {
  constructor(model: Model<IClass>) {
    super(model);
  }

  async CreateClass(end_at: Date, payload: CreateClassDto) {
    return await this.model.create({
      mentor: payload.mentor_id,
      workplace: payload.workplace_id,
      course: payload.course_id,
      start_at: payload.start_at,
      end_at,
      total_session: payload.total_session,
      total_hours: payload.total_hours,
      schedule: payload.schedule,
      class_size: payload.class_size,
      status: payload.status,
      minimum_size: payload.minimum_size
    });
  }

  async FindClassByCode(code: string, populate?: any | null) {
    return this.model
      .findOne({ class_code: code })
      .populate(["mentor", "workplace", { path: "course", populate: { path: "workplace" } }]);
  }

  async FindClassByMentorId(id: string) {
    return this.model
      .find({ mentor: `${id}` })
      .populate(["mentor", "workplace", { path: "course", populate: { path: "workplace" } }]);
  }

  async FindClassByWorkplaceId(id: string) {
    return this.model
      .find({ workplace: `${id}` })
      .populate(["mentor", "workplace", { path: "course", populate: { path: "workplace" } }]);
  }

  async FindClassByCourseId(id: string, page?: number, limit?: number, sortBy?: any | { create_at: -1 }) {
    return this.model
      .find({ course: id })
      .sort(sortBy)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate(["mentor", "workplace", "course"]);
  }
}
