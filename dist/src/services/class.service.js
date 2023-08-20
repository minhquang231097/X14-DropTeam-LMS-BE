"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_model_1 = require("@/models/class.model");
const class_repo_1 = require("@/repository/class.repo");
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
        console.log(error.message);
    }
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
    const dateString = date.toISOString().split("T")[0];
    return holidays.includes(dateString);
}
const CreateOneClass = async (payload) => {
    const { start_at, schedule, total_session } = payload;
    const startDate = new Date(start_at);
    const holidays = await GetHolidays();
    const date_end = calculateEndDate(startDate, Number(total_session), schedule, holidays);
    return await classRepository.CreateClass(date_end, payload);
};
const GetAllClass = async (page, limit) => {
    return await classRepository.FindAllInfoAndPagination(page, limit, ["mentor", "workplace", { path: "course", populate: { path: "workplace" } }]);
};
const GetTotalClass = async () => {
    return await classRepository.Count();
};
const GetClassById = async (id) => {
    return await classRepository.FindById(id, ["mentor", "workplace", { path: "course", populate: { path: "workplace" } }]);
};
const GetClassByCourseId = async (id, page, limit) => {
    return await classRepository.FindClassByCourseId(id, page, limit);
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
    return await classRepository.FindByCondition(filter, ["mentor", "workplace", { path: "course", populate: { path: "workplace" } }]);
};
const SearchClassByCondition = async (searchTerm, page, limit) => {
    const query = {
        $or: [{ class_code: { $regex: searchTerm, $options: "i" } }],
    };
    return await classRepository.SearchByCondition(page, limit, query, ["mentor", "workplace", { path: "course", populate: { path: "workplace" } }]);
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
//# sourceMappingURL=class.service.js.map