import { Class, IClass } from "@/models/class.model";
import { ClassRepository } from "@/repository/class.repo";
import { UpdateClassDto } from "@/types/class";
import courseService from "./course.service";
import userService from "./user.service";
import workplaceService from "./workplace.service";
import moment from "moment";
import { WorkplaceRepository } from "@/repository/workplace.repo";

const classRepository = new ClassRepository(Class);

const CreateOneClass = async (email_mentor: string, workplace_code: string, course_code: string, payload: IClass) => {
  const { start_at, session_per_week, schedule, total_session } = payload;
  const [_mentor, _workplace, _course] = await Promise.all([
    userService.GetUserByEmail(email_mentor),
    workplaceService.GetWorkplaceByCode(workplace_code),
    courseService.GetCourseByCode(course_code),
  ]);
  const id_mentor = _mentor?._id;
  const id_workplace = _workplace?._id;
  const id_course = _course?._id;

  const number_week = total_session / Number(session_per_week);
  const day_start = new Date(start_at).getDay();
  const weekStart = GetWeekNumber(new Date(start_at));
  const holidays: any = [
    new Date("2023-01-01"), // New Year's Day
    new Date("2023-02-01"), // Tết Nguyên Đán (Lunar New Year's Day)
    new Date("2023-02-02"), // Tết Nguyên Đán (Lunar New Year's Day)
    new Date("2023-02-03"), // Tết Nguyên Đán (Lunar New Year's Day)
    new Date("2023-02-04"), // Tết Nguyên Đán (Lunar New Year's Day)
    new Date("2023-02-05"), // Tết Nguyên Đán (Lunar New Year's Day)
    new Date("2023-02-06"), // Tết Nguyên Đán (Lunar New Year's Day)
    new Date("2023-02-07"), // Tết Nguyên Đán (Lunar New Year's Day)
    new Date("2023-04-15"), // Anniversary of Hung Kings
    new Date("2023-04-30"), // Reunification Day
    new Date("2023-05-01"), // International Workers' Day
    new Date("2023-09-02"), // National Day
  ];

  const start = schedule.indexOf(day_start);
  let week_end;
  let date_end;
  if (start === 0 && Number.isInteger(number_week)) {
    week_end = weekStart + number_week;
    date_end = moment()
      .week(week_end)
      .day(schedule[schedule.length - 1])
      .toDate();
  } else if (start > 0 && (total_session % Number(session_per_week)) + start > schedule.length) {
    week_end = weekStart + number_week + 1;
    const day = schedule[(total_session % Number(session_per_week)) + start - Number(session_per_week)];
    date_end = moment().week(week_end).day(day).toDate();
  } else if (start > 0 && (total_session % Number(session_per_week)) + start < schedule.length) {
    week_end = weekStart + number_week + 1;
    const day = (total_session % Number(session_per_week)) + start;
    date_end = moment().week(week_end).day(day).toDate();
  }

  let count = 0;
  for (let i = 0; i < holidays.length; i++) {
    if (date_end !== undefined) {
      if (holidays[i] >= start_at && holidays[i] <= date_end) {
        count++;
      }
    }
  }
  if (count > 0) {
    const total = total_session + count;
    const day = total % Number(session_per_week);
    const week = total / Number(session_per_week);
    const stt = schedule.indexOf(Number(date_end?.getDay()));
    if (stt + day > Number(session_per_week)) {
      date_end = moment()
        .week(week + Number(week_end) + 1)
        .day(schedule[(day + stt) % Number(session_per_week)])
        .toDate();
    } else {
      date_end = moment()
        .week(week + Number(week_end))
        .day(schedule[day + stt])
        .toDate();
    }
  }
  const formatDate = moment(date_end).format("DD/MM/YYYY");
  return await classRepository.CreateClass(id_mentor, id_workplace, id_course, formatDate, payload);
};

function GetWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
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
