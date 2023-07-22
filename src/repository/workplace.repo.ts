import { Workplace } from "@/models/workplace.model";

export class WorkplaceRepository {
    constructor() { }

    static async CreateOne(workplace: any) {
        const createWorkplace = await Workplace.create(workplace)
        return createWorkplace.toObject()
    }

    static async UpdateWorkplace(id: string) {
        const updateWorkplace = await Workplace.findByIdAndUpdate(id)
        return updateWorkplace?.toObject()
    }

    static async FindWorkplaceById(id: string) {
        const workplace = await Workplace.findById(id)
        return workplace?.toObject()
    }

    static async FindWorkplaceByName(name: string) {
        const workplace = await Workplace.findOne({ name })
        return workplace?.toObject()
    }

    static async FindWorkplaceByCode(workplace_code: string) {
        const workplace = await Workplace.findOne({ workplace_code })
        return workplace?.toObject()
    }

    static async GetAllWorkplace() {
        const allWorkplace = await Workplace.find()
        return allWorkplace.map((wp) => wp.toObject())
    }

    static async DeleteOneWorkplaceById(id: string) {
        const deletedWorkplace = await Workplace.findByIdAndDelete(id)
        return deletedWorkplace?.toObject()
    }

    static async DeleteOneWorkplaceByName(name: string) {
        const deletedWorkplace = await Workplace.findOneAndDelete({ name })
        return deletedWorkplace?.toObject()
    }

    static async DeleteOneWorkplaceByCode(workplace_code: string) {
        const deletedWorkplace = await Workplace.findOneAndDelete({ workplace_code })
        return deletedWorkplace?.toObject()
    }
}