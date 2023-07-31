import { ISession } from "@/models/session.model";
import { BaseRepository } from "./base.repo";
import { Model } from "mongoose";

export class SessionRepository extends BaseRepository<ISession>{
    constructor(private readonly sessionModel: Model<ISession>) {
        super(sessionModel)
    }
}