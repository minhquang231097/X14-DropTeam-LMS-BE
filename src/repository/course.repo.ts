import { Course, ICourse } from "@/models/course.model";
import { UpdateCourseDto } from "@/types/course";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repo";

export class CourseRepository extends BaseRepository<ICourse> {
  constructor(model: Model<ICourse>) {
    super(model);
  }

  async FindCourseByCode(course_code: string) {
    const course = await Course.findOne({ course_code }).populate("workplace");
    return course?.toObject();
  }
}
