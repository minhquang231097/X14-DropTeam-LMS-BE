import { ClassStudentRepository } from "@/repository/class.student.repo";
import classService from "./class.service";
import { Class_Student } from "@/models/class.student.model";
import userService from "./user.service";

const classStudentRepository = new ClassStudentRepository(Class_Student);

const AddStudentToClass = async (email: string, class_code: string) => {
  const [_student, _class] = await Promise.all([
    userService.GetUserByEmail(email),
    classService.GetClassByCode(class_code),
  ]);
  const exist = await classStudentRepository.FindByCondition({ student: _student?._id } || { class: _class?._id });
  if (!exist) {
    return await classStudentRepository.Create({
      class: _class?._id,
      student: _student?._id,
    });
  }
};

const GetAllStudentInClass = async (page: number, limit: number, class_code: string) => {
  const _class = await classService.GetClassByCode(class_code);
  const id: string = _class?._id;
  return await classStudentRepository.FindByClassId(id, page, limit, [
    "student",
    { path: "course", populate: { path: "workplace" } },
  ]);
};

const GetClassByStudentEmail = async (page: number, limit: number, email: string) => {
  const student = await userService.GetUserByEmail(email);
  return await classStudentRepository.FindByConditionAndPagination(page, limit, { student: student?._id }, [
    "student",
    { path: "course", populate: { path: "workplace" } },
  ]);
};

const RemoveStudentOutOfClass = async (id: string) => {
  return await classStudentRepository.DeleteOne(id);
};

export default {
  AddStudentToClass,
  RemoveStudentOutOfClass,
  GetAllStudentInClass,
  GetClassByStudentEmail,
};
