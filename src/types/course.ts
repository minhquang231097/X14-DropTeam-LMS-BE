export interface UpdateCourseDto {
    course_code?: string
    title?: string,
    image?: [string],
    session_per_course?: number,
    price?: number,
    desc?: string,
    lesson_list?: [string]
    duration?: number,
    level?: number,
    rate?: number,
    discount?: number
}