import { ILesson } from "@/models/lesson.model";
import { BaseRepository } from "./base.repo";
import { Model, ObjectId } from "mongoose";

export class LessonRepository extends BaseRepository<ILesson> {
  constructor(model: Model<ILesson>) {
    super(model);
  }

  async CreateLesson(session_id: string, payload: any) {
    return this.model.create({ ...payload, session: session_id });
  }

  async FindLessonBySessionId(id: string) {
    return this.model.find({ session: id }).populate("session");
  }
}
