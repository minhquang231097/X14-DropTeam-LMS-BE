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
const classRepository = new class_repo_1.ClassRepository(class_model_1.Class);
const holidays = [
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
    const date_end = calculateEndDate(startDate, Number(total_session), arrSch);
    return await classRepository.CreateClass(id_mentor, id_workplace, id_course, date_end, payload);
};
function calculateEndDate(startDate, totalSessions, schedule) {
    let sessionCount = 0;
    let currentDay = startDate.getDay();
    while (sessionCount < totalSessions && !isHoliday(startDate)) {
        if (schedule.includes(currentDay)) {
            sessionCount++;
        }
        startDate.setDate(startDate.getDate() + 1);
        currentDay = startDate.getDay();
    }
    return new Date(startDate.getTime() - 1 + (totalSessions - sessionCount) * 24 * 60 * 60 * 1000 * (schedule.length - 1));
}
function isHoliday(date) {
    const dateString = date.toISOString().split("T")[0];
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
const SearchClassByCondition = async (page, limit, searchTerm) => {
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
};
//# sourceMappingURL=class.service.js.map