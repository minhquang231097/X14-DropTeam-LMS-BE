import { IFeedback } from "@/models/feedback.model";
import { BaseRepository } from "./base.repo";
import { Model } from "mongoose";

export class FeedbackRepository extends BaseRepository<IFeedback> {
  constructor(model: Model<IFeedback>) {
    super(model);
  }

  async FindFeedbackByCourseId(id: string, page?: number, limit?: number, sortBy?: any | { create_at: -1 }) {
    return this.model
      .find({ course: id })
      .sort(sortBy)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate(["course", { path: "student", select: "-__v -password -refreshToken" }]);
  }

  async FindFeedbackByStudentId(id: string, page?: number, limit?: number, sortBy?: any | { create_at: -1 }) {
    return this.model
      .find({ student: id })
      .sort(sortBy)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate(["course", { path: "student", select: "-__v -password -refreshToken" }]);
  }
}
