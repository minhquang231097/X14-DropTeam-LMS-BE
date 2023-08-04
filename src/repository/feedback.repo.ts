import { IFeedback } from "@/models/feedback.model";
import { BaseRepository } from "./base.repo";
import { Model, ObjectId } from "mongoose";

export class FeedbackRepository extends BaseRepository<IFeedback>{
    constructor(model: Model<IFeedback>) {
        super(model)
    }

    async FindFeedbackByCourseId(id: string) {
        return await this.model.find({ course: id }).populate(["course", "student"])
    }

    async FindFeedbackByStudentId(id: string) {
        return await this.model.find({ student: id }).populate(["course", "student"])
    }
}