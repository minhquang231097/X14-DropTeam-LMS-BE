import { IFeedback } from "@/models/feedback.model";
import { BaseRepository } from "./base.repo";
import { Model, ObjectId } from "mongoose";

export class FeedbackRepository extends BaseRepository<IFeedback> {
  constructor(model: Model<IFeedback>) {
    super(model);
  }

  async FindFeedbackByCourseId(id: string, page: number, limit: number) {
    return this.model
      .find({ course: id })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(["course", "student"]);
  }

  async FindFeedbackByStudentId(id: string, page: number, limit: number) {
    return this.model
      .find({ student: id })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(["course", "student"]);
  }
}
