import { Class, IClass } from "@/models/class.model";
import { ClassRepository } from "@/repository/class.repo";
import { UpdateClassDto } from "@/types/class";
import courseService from "./course.service";
import userService from "./user.service";
import workplaceService from "./workplace.service";
import axios from "axios";

const classRepository = new ClassRepository(Class);

const GetHolidays = async () => {
  try {
    const year = new Date().getFullYear()
    const response = await axios.get(`${process.env.URL}?api_key=${process.env.API_KEY}&country=${process.env.COUNTRY}&year=${year}`);
    const arr = response.data.response.holidays;
    const holidays = arr.map((el: { date: { iso: any; }; }) => el.date.iso)
    return holidays;
  } catch (error) {
    console.error("Error retrieving holidays:", error);
    throw error;
  }
};

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
    const holidays = await GetHolidays()
    const date_end = calculateEndDate(startDate, Number(total_session), arrSch, holidays);
    return await classRepository.CreateClass(id_mentor, id_workplace, id_course, date_end, payload);
};

function calculateEndDate(startDate: Date, totalSessions:number, schedule: number[], holidays: string[]) {
  let sessionCount = 0;
  let currentDate = new Date(startDate);

  while (sessionCount < totalSessions) {
    const currentDay = currentDate.getDay();
    if (schedule.includes(currentDay) && !isHoliday(currentDate, holidays)) {
      sessionCount++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  const previousDay = new Date(currentDate);
  previousDay.setDate(previousDay.getDate() - 1);
  return previousDay;
}

function isHoliday(date: Date, holidays: string[]) {
  const dateString = date.toISOString().split('T')[0];
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
  return await classRepository.Count();
};

const GetClassById = async (id: string) => {
  return await classRepository.FindById(id, [
    "mentor",
    "workplace",
    { path: "course", populate: { path: "workplace" } },
  ]);
};

const GetClassByCourseCode = async (code: string, page?: any, limit?: any) => {
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

const SearchClassByCondition = async (searchTerm?: string, page?: any, limit?: any) => {
  const query = {
    $or: [{ class_code: { $regex: searchTerm, $options: "i" } }],
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
  GetHolidays
};
