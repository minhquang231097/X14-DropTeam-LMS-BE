import { Class, IClass } from "@/models/class.model";
import { ClassRepository } from "@/repository/class.repo";
import { CreateClassDto, UpdateClassDto } from "@/types/class";
import courseService from "./course.service";
import userService from "./user.service";
import workplaceService from "./workplace.service";
import axios from "axios";

const classRepository = new ClassRepository(Class);

const GetHolidays = async () => {
  try {
    const year = new Date().getFullYear();
    const response = await axios.get(`${process.env.URL}?api_key=${process.env.API_KEY}&country=${process.env.COUNTRY}&year=${year}`);
    const arr = response.data.response.holidays;
    const holidays = arr.map((el: { date: { iso: any } }) => el.date.iso);
    return holidays;
  } catch (error: Error | any) {
    console.log(error.message);
  }
};

function calculateEndDate(startDate: Date, totalSessions: number, schedule: number[], holidays: string[]) {
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
  const dateString = date.toISOString().split("T")[0];
  return holidays.includes(dateString);
}

const CreateOneClass = async (payload: CreateClassDto) => {
  const { start_at, schedule, total_session } = payload;

  const startDate = new Date(start_at);
  const holidays = await GetHolidays();
  const date_end = calculateEndDate(startDate, Number(total_session), schedule, holidays);
  return await classRepository.CreateClass(date_end, payload);
};

const GetAllClass = async (page?: number, limit?: number) => {
  return await classRepository.FindAllInfoAndPagination(page, limit, ["mentor", "workplace", { path: "course", populate: { path: "workplace" } }]);
};

const GetTotalClass = async () => {
  return await classRepository.Count();
};

const GetClassById = async (id: string) => {
  return await classRepository.FindById(id, ["mentor", "workplace", { path: "course", populate: { path: "workplace" } }]);
};

const GetClassByCourseId = async (id: string, page?: any, limit?: any) => {
  return await classRepository.FindClassByCourseId(id, page, limit);
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
  return await classRepository.FindByCondition(filter, ["mentor", "workplace", { path: "course", populate: { path: "workplace" } }]);
};

const SearchClassByCondition = async (searchTerm?: string, page?: any, limit?: any) => {
  const query = {
    $or: [{ class_code: { $regex: searchTerm, $options: "i" } }],
  };
  return await classRepository.SearchByCondition(page, limit, query, ["mentor", "workplace", { path: "course", populate: { path: "workplace" } }]);
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
  GetClassByCourseId,
  GetClassByCondition,
  SearchClassByCondition,
  UpdateOneClass,
  UpdateManyClass,
  DeleteClassById,
  DeleteClassByCondition,
  GetClassByCode,
  GetTotalClass,
  GetHolidays,
};
