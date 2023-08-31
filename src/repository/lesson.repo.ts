import { ILesson } from "@/models/lesson.model";
import { BaseRepository } from "./base.repo";
import { Model, ObjectId } from "mongoose";

export class LessonRepository extends BaseRepository<ILesson> {
  constructor(model: Model<ILesson>) {
    super(model);
  }

  async FindLessonByCourseId(id: string, page: number, limit: number) {
    return this.model
      .find({ course: id })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate([{ path: "session", populate: [{ path: "class" }] }, "course"]);
  }
}
