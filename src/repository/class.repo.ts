import { Class, IClass } from "@/models/class.model"

export class ClassRepository {
    constructor() { }

    static async CreateOne(item: IClass) {
        const createClass = await Class.create(item)
        return createClass.toObject()
    }

    static async UpdateClass(id: string, update: IClass) {
        const updateClass = await Class.findByIdAndUpdate(id, update)
        return updateClass?.toObject()
    }

    static async FindClassById(id: string) {
        const item = await Class.findById(id)
        return item?.toObject()
    }

    static async FindClassByName(title: string) {
        const item = await Class.findOne({ title })
        return item?.toObject()
    }

    static async FindClassByCode(class_code: string) {
        const item = await Class.findOne({ class_code })
        return item?.toObject()
    }

    static async GetAllClass(page: number) {
        const class_per_page = 12
        const allClass = await Class.find().skip((page - 1) * class_per_page).limit(class_per_page)
        return allClass.map((item) => item.toObject())
    }

    static async DeleteOneClassById(id: string) {
        const deletedClass = await Class.findByIdAndDelete(id)
        return deletedClass?.toObject()
    }

    static async DeleteOneClassByName(title: string) {
        const deletedClass = await Class.findOneAndDelete({ title })
        return deletedClass?.toObject()
    }

    static async DeleteOneClassByCode(class_code: string) {
        const deletedClass = await Class.findOneAndDelete({ class_code })
        return deletedClass?.toObject()
    }
}