import { ICourse } from "@/models/course.model";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repo";

export class CourseRepository extends BaseRepository<ICourse> {
  constructor(model: Model<ICourse>) {
    super(model);
  }

  async FindCourseByCode(course_code: string) {
    const course = await this.model.findOne({ course_code });
    return course?.toObject();
  }
}
