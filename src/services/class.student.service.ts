import { ClassStudentRepository } from "@/repository/class.student.repo";
import { Class_Student } from "@/models/class.student.model";
import { AddStudentToClassDto, UpdateStatusStudentInClassDto } from "@/types/class";
import classService from "./class.service";
import userService from "./user.service";

const classStudentRepository = new ClassStudentRepository(Class_Student);

const AddStudentToClass = async (list: AddStudentToClassDto[]) => {
  return await Promise.all(
    list.map((el) => {
      return classStudentRepository.Create({
        student: el.student_id,
        class: el.class_id,
      });
    }),
  );
};

const GetAllStudentInClass = async (class_id: string, page?: any, limit?: any) => {
  const _class = await classService.GetClassById(class_id);
  if (!_class) {
    return [];
  }
  return await classStudentRepository.FindByClassId(class_id, page, limit, ["student"]);
};

const GetClassByStudentId = async (id: string, page?: any, limit?: any) => {
  const student = await userService.GetUserById(id);
  if (!student) {
    return [];
  }
  return await classStudentRepository.FindByConditionAndPagination({ student: id }, page, limit, [
    "student",
    { path: "course", populate: { path: "workplace" } },
  ]);
};

const UpdateStatusStudentInClass = async (payload: UpdateStatusStudentInClassDto) => {
  return await classStudentRepository.FindByConditionAndUpdate(
    {
      student: payload.student_id,
      class: payload.class_id,
    },
    {
      status: payload.status,
    },
  );
};

const RemoveStudentOutOfClass = async (id: string) => {
  return await classStudentRepository.DeleteOne(id);
};

export default {
  AddStudentToClass,
  RemoveStudentOutOfClass,
  GetAllStudentInClass,
  GetClassByStudentId,
  UpdateStatusStudentInClass,
};
