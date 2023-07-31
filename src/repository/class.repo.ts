import { Class, IClass } from "@/models/class.model";
import { UpdateClassDto } from "@/types/class";
import { FilterQuery, ObjectId } from "mongoose";

export class ClassRepository {
    constructor() { }

    static async CreateClass(mentor: ObjectId | string, workplace: ObjectId | string, course: ObjectId | string, payload: IClass) {
        return (await Class.create({ ...payload, mentor, workplace, course })).toObject()
    }

    static async FindClassByCondition(
        filter: FilterQuery<IClass> | any,
        field?: any | null,
        option?: any | null,
        populate?: any | null): Promise<IClass[]> {
        return await Class.find(filter, field, option).populate(populate)
    }

    static async FindOneByCondition(
        filter: FilterQuery<IClass> | undefined,
        field?: any | null,
        option?: any | null,
        populate?: any | null,
    ) {
        return await Class.findOne(filter, field, option).populate(populate);
    }

    static async FindClassById(id: ObjectId | string) {
        return await Class.findById(id)
    }

    static async FindClassByCode(code: string) {
        return await Class.findOne({ class_code: code })
    }

    static async FindAllClass(page: number, limit: number): Promise<IClass[]> {
        return await Class.find().skip((page - 1) * limit).limit(limit)
    }

    static async FindByConditionAndUpdate(filter: any, update: IClass) {
        return await Class.findOneAndUpdate(filter, update)
    }

    static async UpdateOneClass(
        id: ObjectId | string,
        update?: UpdateClassDto) {
        return await Class.findOneAndUpdate({ _id: id }, update)
    }

    static async UpdateManyClass(
        filter: FilterQuery<IClass> | any,
        update?: UpdateClassDto) {
        return await Class.updateMany(filter, update)
    }

    static async DeleteClassByCondition(
        filter: FilterQuery<IClass> | any) {
        return await Class.deleteMany(filter)
    }

    static async DeleteClassById(id: ObjectId | string) {
        return await Class.findByIdAndDelete({ _id: id })
    }
}