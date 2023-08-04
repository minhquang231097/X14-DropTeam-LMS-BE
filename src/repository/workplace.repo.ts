import { IWorkplace } from "@/models/workplace.model";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repo";

export class WorkplaceRepository extends BaseRepository<IWorkplace> {
    constructor(model: Model<IWorkplace>) {
        super(model)
    }

    async FindWorkplaceByCode(workplace_code: string) {
        const workplace = await this.model.findOne({ workplace_code })
        return workplace?.toObject()
    }
}