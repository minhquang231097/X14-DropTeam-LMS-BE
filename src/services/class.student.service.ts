import { ClassStudentRepository } from "@/repository/class.student.repo";
import { Class_Student } from "@/models/class.student.model";
import { AddStudentToClassDto, UpdateStatusStudentInClassDto } from "@/types/class";
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

const GetStudentInClassByStudentId = async (student_id: string) => {
  return await classStudentRepository.FindByCondition({ student: student_id }, ["student"]);
};

const GetAllStudentInClass = async (class_id: string, page?: any, limit?: any) => {
  return await classStudentRepository.FindByClassId(class_id, page, limit, ["student"]);
};

const GetClassByStudentId = async (id: string, page?: any, limit?: any) => {
  return await classStudentRepository.FindByConditionAndPagination({ student: id }, page, limit, ["student"]);
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
  GetStudentInClassByStudentId,
};
