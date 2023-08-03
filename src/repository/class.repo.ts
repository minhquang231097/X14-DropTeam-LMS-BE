import { Class, IClass } from "@/models/class.model";
import { Model, ObjectId } from "mongoose";
import { BaseRepository } from "./base.repo";

export class ClassRepository extends BaseRepository<IClass> {
    constructor(model: Model<IClass>) {
        super(model)
    }

    async CreateClass(mentor: ObjectId | string, workplace: ObjectId | string, course: ObjectId | string, payload: IClass) {
        return await this.model.create({ ...payload, mentor, workplace, course })
    }

    async FindClassByCode(code: string) {
        return await Class.findOne({ class_code: code }).populate(["mentor", "workplace", "course"])
    }

    async FindClassByMentorId(id: ObjectId | string) {
        return await Class.find({ mentor: id }).populate(["mentor", "workplace", "course"])
    }

    async FindClassByWorkplaceId(id: ObjectId | string) {
        return await Class.find({ workplace: id }).populate(["mentor", "workplace", "course"])
    }

    async FindClassByCourseId(id: ObjectId | string) {
        return await Class.find({ course: id }).populate(["mentor", "workplace", "course"])
    }
}