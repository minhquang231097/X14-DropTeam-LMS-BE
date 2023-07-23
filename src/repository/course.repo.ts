import { Course } from "@/models/course.model";

export class CourseRepository {
    constructor() { }

    static async CreateOne(course: any) {
        const createCourse = await Course.create(course)
        return createCourse.toObject()
    }

    static async UpdateCourse(id: string, update: any) {
        const updateCourse = await Course.findByIdAndUpdate(id, update)
        return updateCourse?.toObject()
    }

    static async FindCourseById(id: string) {
        const course = await Course.findById(id)
        return course?.toObject()
    }

    static async FindCourseByName(title: string) {
        const course = await Course.findOne({ title })
        return course?.toObject()
    }

    static async FindCourseByCode(course_code: string) {
        const course = await Course.findOne({ course_code })
        return course?.toObject()
    }

    static async GetAllCourse() {
        const allCourse = await Course.find()
        return allCourse.map((wp) => wp.toObject())
    }

    static async DeleteOneCourseById(id: string) {
        const deletedCourse = await Course.findByIdAndDelete(id)
        return deletedCourse?.toObject()
    }

    static async DeleteOneCourseByName(title: string) {
        const deletedCourse = await Course.findOneAndDelete({ title })
        return deletedCourse?.toObject()
    }

    static async DeleteOneCourseByCode(course_code: string) {
        const deletedCourse = await Course.findOneAndDelete({ course_code })
        return deletedCourse?.toObject()
    }
}