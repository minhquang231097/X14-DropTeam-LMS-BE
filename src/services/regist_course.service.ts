import courseService from "./course.service";
import workplaceService from "./workplace.service";
import userService from "./user.service";
import { IUser } from "@/models/user.model";
import { RegistedCourse } from "@/models/registe_course.model";
import { RegistedCourseRepository } from "@/repository/regist_course.repo";

const registCourseRepository = new RegistedCourseRepository(RegistedCourse);

const CreateRegistCourse = async (
    course_code: string,
    student_id: string,
    note: string,
) => {
    const _course: any = await courseService.GetCourseByCode(course_code);
    const _student: IUser = await userService.GetUserById(student_id);

    return await registCourseRepository.Create({
        fullname: _student.fullname,
        email: _student.email,
        phone_number: _student.phone_number,
        course: _course._id,
        workplace: _course.workplace,
        note: note,
        student: _student._id,
    });
};

const GetAllRegist = async (page: number, limit: number) => {
    return await registCourseRepository.FindAllInfoAndPagination(page, limit);
};

const GetRegistByCourseCode = async (
    code: string,
    page: number,
    limit: number,
) => {
    const _course = await courseService.GetCourseByCode(code);
    return await registCourseRepository.FindRegistbyCourseId(_course?._id, page, limit,);
};

const GetRegistByWorkplaceCode = async (code: string) => {
    const _workplace = await workplaceService.GetWorkplaceByCode(code);
    return await registCourseRepository.FindRegistbyWorkplaceId(_workplace?._id);
};

const GetRegistByEmailStudent = async (email: string) => {
    const _student = await userService.GetUserByEmail(email);
    return await registCourseRepository.FindRegistbyStudentId(_student?._id);
};

const UpdateRegist = async (id: string, payload: any) => {
    return await registCourseRepository.FindByIdAndUpdate(id, payload);
};

const DeleteRegist = async (id: string) => {
    return await registCourseRepository.DeleteOne(id);
};

export default {
    DeleteRegist,
    UpdateRegist,
    CreateRegistCourse,
    GetRegistByCourseCode,
    GetRegistByWorkplaceCode,
    GetRegistByEmailStudent,
    GetAllRegist,
};
