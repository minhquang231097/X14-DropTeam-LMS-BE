import { ClassStudentRepository } from "@/repository/class.student.repo";
import { Class_Student } from "@/models/class.student.model";
import { AddStudentToClassDto, UpdateStatusStudentInClassDto } from "@/types/class";
import registCourseService from "@/services/regist.course.service";
import classStudentService from "@/services/class.student.service";
import classService from "@/services/class.service";
import { IClass } from "@/models/class.model";
const classStudentRepository = new ClassStudentRepository(Class_Student);

const AddStudentToClass = async (list: AddStudentToClassDto[], class_id: string) => {
  let num = await classStudentService.CountNumberOfStudentInClass(class_id);
  const classDetail: IClass = await classService.GetClassById(class_id);
  return await Promise.all(
    list.map((el) => {
      num++;
      if (num > classDetail.minimum_size) {
        classService.UpdateOneClass(class_id, { status: "ON" });
      }
      return classStudentRepository.Create({
        student: el.student_id,
        status: el.status,
        class: class_id,
      });
    }),
  );
};

const CheckStudentLengthAndInRegistCourse = async (list: AddStudentToClassDto[]) => {
  const duplicateStudentIds: string[] = [];
  await Promise.all(
    list.map(async (el) => {
      if (el.student_id.length == 24) {
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

const GetAllStudentInClass = async (class_id: string, page?: number, limit?: number, sortBy?: any) => {
  return await classStudentRepository.FindByClassId(class_id, page, limit, sortBy);
};

const GetClassByStudentId = async (id: string, page?: number, limit?: number, sortBy?: any) => {
  return await classStudentRepository.FindByConditionAndPagination({ student: id }, page, limit, sortBy, ["student"]);
};
const CheckStudentExistInClass = async (student_id: string, class_id: string) => {
  return await classStudentRepository.FindByCondition({ class: class_id, student: student_id });
};

const CountNumberOfStudentInClass = async (class_id: string) => {
  return await classStudentRepository.CountStudentInClass(class_id);
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
  CheckStudentExistInClass,
  CountNumberOfStudentInClass,
};
