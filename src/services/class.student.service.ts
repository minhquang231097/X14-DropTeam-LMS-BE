import { ClassStudentRepository } from "@/repository/class.student.repo";
import classService from "./class.service";
import userService from "./user.service";
import { Class_Student } from "@/models/class.student.model";

const classStudentRepository = new ClassStudentRepository(Class_Student);

const AddStudentToClass = async (email: string, class_code: string) => {
  const _student = await userService.GetUserByEmail(email);
  const _class = await classService.GetClassByCode(class_code);
  const exist = await classStudentRepository.FindByCondition(
    { student: _student?._id } || { class: _class?._id },
  );
  if (!exist) {
    return await classStudentRepository.Create({
      class: _class?._id,
      student: _student?._id,
    });
  }
};

const GetAllStudentInClass = async (page: number, limit: number) => {
  return await classStudentRepository.FindAllInfoAndPagination(
    page,
    limit,
    "student",
  );
};

const RemoveStudentOutOfClass = async (id: string) => {
  return await classStudentRepository.DeleteOne(id);
};

export default {
  AddStudentToClass,
  RemoveStudentOutOfClass,
  GetAllStudentInClass,
};
