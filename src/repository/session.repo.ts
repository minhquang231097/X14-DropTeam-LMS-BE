import { Model, ObjectId, Types } from 'mongoose';
import { BaseRepository } from './base.repo';
import { ISession } from '@/models/session.model';

export class SessionRepository extends BaseRepository<ISession> {
    constructor(model: Model<ISession>) {
        super(model);
    }

    async CreateSession(course_id: ObjectId, payload: any) {
        return await this.model.create({ ...payload, course: course_id })
    }

    async FindSessionByCode(session_code: string) {
        const session = await this.model.findOne({ session_code }).populate("courses")
        return session?.toObject()
    }

    async FindSessionByCourseId(id: ObjectId | string) {
        const session = await this.model.findOne({ course: id }).populate("courses")
        return session?.toObject()
    }
}