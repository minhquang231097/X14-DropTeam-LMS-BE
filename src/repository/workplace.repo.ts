import { IWorkplace } from "@/models/workplace.model";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repo";

export class WorkplaceRepository extends BaseRepository<IWorkplace> {
    constructor(model: Model<IWorkplace>) {
        super(model)
    }

    static async CreateOne(workplace: IWorkplace) {
        const createWorkplace = await Workplace.create(workplace)
        return createWorkplace.toObject()
    }

    static async UpdateWorkplace(id: ObjectId | string, update: UpdateWorkplaceDto) {
        const updateWorkplace = await Workplace.findByIdAndUpdate(id, update)
        return updateWorkplace?.toObject()
    }

    static async FindWorkplaceById(id: ObjectId | string) {
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

    static async GetAllWorkplace(page: number) {
        const workplace_per_page = 10
        const allWorkplace = await Workplace.find().skip((page - 1) * workplace_per_page).limit(workplace_per_page)
        return allWorkplace.map((wp) => wp.toObject())
    }

    static async DeleteOneWorkplaceById(id: ObjectId | string) {
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