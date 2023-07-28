import { Class, IClass } from "@/models/class.model";
import { FilterQuery } from "mongoose";

export class ClassRepository {
    constructor() { }

    static async CreateClass(payload: IClass) {
        return (await Class.create(payload)).toObject()
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

    static async FindClassById(id: string) {
        return await Class.findById(id)
    }

    static async FindAllClass(page: number): Promise<IClass[]> {
        const class_per_page = 12
        return await Class.find().skip((page - 1) * class_per_page).limit(class_per_page)
    }

    static async FindByConditionAndUpdate(filter: any, update: IClass) {
        return await Class.findOneAndUpdate(filter, update)
    }

    static async UpdateOneClass(
        filter: FilterQuery<IClass> | any,
        update?: any | null) {
        return await Class.findOneAndUpdate(filter, update)
    }

    static async UpdateManyClass(
        filter: FilterQuery<IClass> | any,
        update?: any | null) {
        return await Class.updateMany(filter, update)
    }

    static async DeleteClassByCondition(
        filter: FilterQuery<IClass>) {
        return await Class.deleteMany(filter)
    }

    static async DeleteClassById(id: string) {
        return await Class.findByIdAndDelete(id)
    }
}