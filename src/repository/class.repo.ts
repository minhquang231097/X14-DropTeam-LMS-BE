import { Class, IClass } from "@/models/class.model";
import { Model, ObjectId } from "mongoose";
import { BaseRepository } from "./base.repo";

export class ClassRepository extends BaseRepository<IClass> {
    constructor(model: Model<IClass>) {
        super(model)
    }

    async CreateClass(mentor: string, workplace: string, course: string, payload: IClass) {
        return await this.model.create({ ...payload, mentor, workplace, course })
    }

    async FindClassByCode(code: string) {
        return await Class.findOne({ class_code: `${code}` }).populate(["mentor", "workplace", "course"])
    }

    async FindClassByMentorId(id: string) {
        return await Class.find({ mentor: `${id}` }).populate(["mentor", "workplace", "course"])
    }

    async FindClassByWorkplaceId(id: string) {
        return await Class.find({ workplace: `${id}` }).populate(["mentor", "workplace", "course"])
    }

<<<<<<<< <Temporary merge branch 1
    static async FindByConditionAndUpdate(filter: any, update: IClass) {
    return await Class.findOneAndUpdate(filter, update)
}

    static async UpdateOneClass(
    filter: FilterQuery<IClass> | any,
    update ?: any | null) {
    return await Class.findOneAndUpdate(filter, update)
}

    static async UpdateManyClass(
    filter: FilterQuery<IClass> | any,
    update ?: any | null) {
    return await Class.updateMany(filter, update)
}

    static async DeleteClassByCondition(
    filter: FilterQuery<IClass>) {
    return await Class.deleteMany(filter)
}


    static async DeleteClassById(id: string) {
    return await Class.findByIdAndDelete(id)
=========
    async FindClassByCourseId(id: ObjectId | string) {
        return await Class.find({ course: id }).populate(["mentor", "workplace", "course"])
>>>>>>>>> Temporary merge branch 2
    }
}