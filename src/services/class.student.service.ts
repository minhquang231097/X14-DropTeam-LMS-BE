import { ClassStudentRepository } from "@/repository/class.student.repo";
import { Class_Student } from "@/models/class.student.model";
import { AddStudentToClassDto, UpdateStatusStudentInClassDto } from "@/types/class";
import registCourseService from "@/services/regist.course.service";
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

const CheckStudentLengthAndInRegistCourse = async (list: AddStudentToClassDto[]) => {
  const duplicateStudentIds: string[] = [];
  await Promise.all(
    list.map(async (el) => {
      if (el.student_id.length == 24 && el.class_id.length == 24) {
        const regist = await registCourseService.GetRegistByStudentId(el.student_id);
        if (regist.length > 0) {
          duplicateStudentIds.push(el.student_id);
        }
      } else {
        duplicateStudentIds.length = 0;
      }
    }),
  );
  if (duplicateStudentIds.length != list.length) {
    return [];
  } else {
    return duplicateStudentIds;
  }
};

const GetStudentInClassByStudentId = async (student_id: string) => {
  return await classStudentRepository.FindByCondition({ student: student_id }, ["student"]);
};

const GetAllStudentInClass = async (class_id: string, page?: any, limit?: any) => {
  return await classStudentRepository.FindByClassId(class_id, page, limit, ["student"]);
};

const GetClassByStudentId = async (id: string, page?: any, limit?: any) => {
  return await classStudentRepository.FindByConditionAndPagination({ student: id }, page, limit, ["student"], { create_at: -1 });
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
  CheckStudentLengthAndInRegistCourse,
};
