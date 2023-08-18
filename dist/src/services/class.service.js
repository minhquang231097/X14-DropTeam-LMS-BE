"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_model_1 = require("@/models/class.model");
const class_repo_1 = require("@/repository/class.repo");
const course_service_1 = __importDefault(require("./course.service"));
const user_service_1 = __importDefault(require("./user.service"));
const workplace_service_1 = __importDefault(require("./workplace.service"));
const axios_1 = __importDefault(require("axios"));
const classRepository = new class_repo_1.ClassRepository(class_model_1.Class);
const GetHolidays = async () => {
    try {
        const year = new Date().getFullYear();
        const response = await axios_1.default.get(`${process.env.URL}?api_key=${process.env.API_KEY}&country=${process.env.COUNTRY}&year=${year}`);
        const arr = response.data.response.holidays;
        const holidays = arr.map((el) => el.date.iso);
        return holidays;
    }
    catch (error) {
        console.error("Error retrieving holidays:", error);
        throw error;
    }
};
const CreateOneClass = async (email_mentor, workplace_code, course_code, payload) => {
    const { start_at, schedule, total_session, class_code } = payload;
    const [_mentor, _workplace, _course, _class] = await Promise.all([
        user_service_1.default.GetUserByEmail(email_mentor),
        workplace_service_1.default.GetWorkplaceByCode(workplace_code),
        course_service_1.default.GetCourseByCode(course_code),
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
    const holidays = await GetHolidays();
    const date_end = calculateEndDate(startDate, Number(total_session), arrSch, holidays);
    return await classRepository.CreateClass(id_mentor, id_workplace, id_course, date_end, payload);
};
function calculateEndDate(startDate, totalSessions, schedule, holidays) {
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
function isHoliday(date, holidays) {
    const dateString = date.toISOString().split('T')[0];
    return holidays.includes(dateString);
}
const GetAllClass = async (page, limit) => {
    return await classRepository.FindAllInfoAndPagination(page, limit, [
        "mentor",
        "workplace",
        { path: "course", populate: { path: "workplace" } },
    ]);
};
const GetTotalClass = async () => {
    return await classRepository.Count();
};
const GetClassById = async (id) => {
    return await classRepository.FindById(id, [
        "mentor",
        "workplace",
        { path: "course", populate: { path: "workplace" } },
    ]);
};
const GetClassByCourseCode = async (code, page, limit) => {
    const _course = await course_service_1.default.GetCourseByCode(code);
    return await classRepository.FindClassByCourseId(_course?._id, page, limit);
};
const GetClassByCode = async (code) => {
    return await classRepository.FindClassByCode(code);
};
const GetClassByMentorId = async (id) => {
    return await classRepository.FindClassByMentorId(id);
};
const GetClassByWorkplaceId = async (id) => {
    return await classRepository.FindClassByWorkplaceId(id);
};
const GetClassByCondition = async (filter) => {
    return await classRepository.FindByCondition(filter, [
        "mentor",
        "workplace",
        { path: "course", populate: { path: "workplace" } },
    ]);
};
const SearchClassByCondition = async (searchTerm, page, limit) => {
    const query = {
        $or: [{ class_code: { $regex: searchTerm, $options: "i" } }],
    };
    return await classRepository.SearchByCondition(page, limit, query, [
        "mentor",
        "workplace",
        { path: "course", populate: { path: "workplace" } },
    ]);
};
const UpdateOneClass = async (id, payload) => {
    return await classRepository.FindByIdAndUpdate(id, payload);
};
const UpdateManyClass = async (filter, payload) => {
    return await classRepository.UpdateMany(filter, payload);
};
const DeleteClassById = async (id) => {
    return await classRepository.DeleteOne(id);
};
const DeleteClassByCondition = async (filter) => {
    return await classRepository.DeleteByCondition(filter);
};
exports.default = {
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
//# sourceMappingURL=class.service.js.map