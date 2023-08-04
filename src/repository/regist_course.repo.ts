import { IRegistedCourse } from "@/models/registe_course.model";
import { BaseRepository } from "./base.repo";
import { Model, ObjectId } from "mongoose";

export class RegistedCourseRepository extends BaseRepository<IRegistedCourse>{
    constructor(model: Model<IRegistedCourse>) {
        super(model)
    }

    async FindRegistbyCourseId(id:string) {
        return this.model.find({ course: id }).populate(["course", "workplaces", "student"])
    }

    async FindRegistbyWorkplaceId(id:string) {
        return this.model.find({ workplace: id }).populate(["course", "workplaces", "student"])
    }

    async FindRegistbyStudentId(id:string) {
        return this.model.find({ student: id }).populate(["course", "workplaces", "student"])
    }
}