import { IWorkplace } from "@/models/workplace.model";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repo";

export class WorkplaceRepository extends BaseRepository<IWorkplace> {
  constructor(model: Model<IWorkplace>) {
    super(model);
  }
}
