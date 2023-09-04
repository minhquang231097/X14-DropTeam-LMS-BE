import { ILesson } from "@/models/lesson.model";
import { BaseRepository } from "./base.repo";
import { Model, ObjectId } from "mongoose";

export class LessonRepository extends BaseRepository<ILesson> {
  constructor(model: Model<ILesson>) {
    super(model);
  }

  async FindLessonByCourseId(id: string, page?: number, limit?: number, sortBy?: any | { create_at: -1 }) {
    return this.model
      .find({ course: id })
      .sort(sortBy)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate(["course"]);
  }
}
