import { Class, IClass } from "@/models/class.model";
import { ClassRepository } from "@/repository/class.repo";
import { UpdateClassDto } from "@/types/class";
import courseService from "./course.service";
import userService from "./user.service";
import workplaceService from "./workplace.service";

const classRepository = new ClassRepository(Class);
const holidays: any = [
  "2023-01-01",
  "2023-02-01",
  "2023-02-02",
  "2023-02-03",
  "2023-02-04",
  "2023-02-05",
  "2023-02-06",
  "2023-02-07",
  "2023-04-15",
  "2023-04-30",
  "2023-05-01",
  "2023-09-02",
];
const CreateOneClass = async (email_mentor: string, workplace_code: string, course_code: string, payload: IClass) => {
  const { start_at, schedule, total_session, class_code } = payload;
  const [_mentor, _workplace, _course, _class] = await Promise.all([
    userService.GetUserByEmail(email_mentor),
    workplaceService.GetWorkplaceByCode(workplace_code),
    courseService.GetCourseByCode(course_code),
    classRepository.FindClassByCode(class_code),
  ]);

    const id_mentor = _mentor?._id;
    const id_workplace = _workplace?._id;
    const id_course = _course?._id;

    let arrSch = [];
    for (let i = 0; i < schedule.length; i++) {
      arrSch.push(new Date(schedule[i]).getDay());
    }
    const startDate = new Date(start_at);
    const date_end = calculateEndDate(startDate, Number(total_session), arrSch);
    return await classRepository.CreateClass(id_mentor, id_workplace, id_course, date_end, payload);
};

function calculateEndDate(startDate: Date, totalSessions: number, schedule: number[]) {
  let sessionCount = 0;
  let currentDay = startDate.getDay();

  while (sessionCount < totalSessions && !isHoliday(startDate)) {
    if (schedule.includes(currentDay)) {
      sessionCount++;
    }
    startDate.setDate(startDate.getDate() + 1);
    currentDay = startDate.getDay();
  }
  return new Date(
    startDate.getTime() - 1 + (totalSessions - sessionCount) * 24 * 60 * 60 * 1000 * (schedule.length - 1),
  );
}

function isHoliday(date: Date) {
  const dateString = date.toISOString().split("T")[0];
  return holidays.includes(dateString);
}

const GetAllClass = async (page: number, limit: number) => {
  return await classRepository.FindAllInfoAndPagination(page, limit, [
    "mentor",
    "workplace",
    { path: "course", populate: { path: "workplace" } },
  ]);
};

const GetTotalClass = async () => {
  return (await classRepository.FindAll()).length;
};

const GetClassById = async (id: string) => {
  return await classRepository.FindById(id, [
    "mentor",
    "workplace",
    { path: "course", populate: { path: "workplace" } },
  ]);
};

const GetClassByCourseCode = async (code: string, page: number, limit: number) => {
  const _course = await courseService.GetCourseByCode(code);
  return await classRepository.FindClassByCourseId(_course?._id, page, limit);
};

const GetClassByCode = async (code: string) => {
  return await classRepository.FindClassByCode(code);
};

const GetClassByMentorId = async (id: string) => {
  return await classRepository.FindClassByMentorId(id);
};

const GetClassByWorkplaceId = async (id: string) => {
  return await classRepository.FindClassByWorkplaceId(id);
};

const GetClassByCondition = async (filter: IClass) => {
  return await classRepository.FindByCondition(filter, [
    "mentor",
    "workplace",
    { path: "course", populate: { path: "workplace" } },
  ]);
};

const SearchClassByCondition = async (page: number, limit: number, searchTerm?: string) => {
  const query = {
    $or: [
      { mentor: { $regex: searchTerm, $options: "i" } },
      { workplace: { $regex: searchTerm, $options: "i" } },
      { course: { $regex: searchTerm, $options: "i" } },
      { class_code: { $regex: searchTerm, $options: "i" } },
    ],
  };
  return await classRepository.SearchByCondition(page, limit, query, [
    "mentor",
    "workplace",
    { path: "course", populate: { path: "workplace" } },
  ]);
};

const UpdateOneClass = async (id: string, payload: UpdateClassDto) => {
  return await classRepository.FindByIdAndUpdate(id, payload);
};

const UpdateManyClass = async (filter: UpdateClassDto, payload: UpdateClassDto) => {
  return await classRepository.UpdateMany(filter, payload);
};

const DeleteClassById = async (id: string) => {
  return await classRepository.DeleteOne(id);
};

const DeleteClassByCondition = async (filter: UpdateClassDto) => {
  return await classRepository.DeleteByCondition(filter);
};

export default {
  CreateOneClass,
  GetAllClass,
  GetClassById,
  GetClassByMentorId,
  GetClassByWorkplaceId,
  GetClassByCourseCode,
  GetClassByCondition,
  SearchClassByCondition,
  UpdateOneClass,
  UpdateManyClass,
  DeleteClassById,
  DeleteClassByCondition,
  GetClassByCode,
  GetTotalClass,
};
