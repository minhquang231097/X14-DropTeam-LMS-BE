import { IWorkplace } from "@/models/workplace.model";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repo";

export class WorkplaceRepository extends BaseRepository<IWorkplace> {
    constructor(model: Model<IWorkplace>) {
        super(model)
    }

<<<<<<<< <Temporary merge branch 1
    static async UpdateWorkplace(id: string, update: WorkplaceBody) {
    const updateWorkplace = await Workplace.findByIdAndUpdate(id, update)
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

    static async GetAllWorkplace(page: number) {
    const workplace_per_page = 10
    const allWorkplace = await Workplace.find().skip((page - 1) * workplace_per_page).limit(workplace_per_page)
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
=========
    async FindWorkplaceByCode(workplace_code: string) {
        const workplace = await this.model.findOne({ workplace_code })
        return workplace?.toObject()
    }
>>>>>>>>> Temporary merge branch 2
}