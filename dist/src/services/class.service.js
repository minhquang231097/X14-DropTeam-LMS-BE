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
const moment_1 = __importDefault(require("moment"));
const classRepository = new class_repo_1.ClassRepository(class_model_1.Class);
const CreateOneClass = async (email_mentor, workplace_code, course_code, payload) => {
    const { start_at, session_per_week, schedule, total_session } = payload;
    const [_mentor, _workplace, _course] = await Promise.all([
        user_service_1.default.GetUserByEmail(email_mentor),
        workplace_service_1.default.GetWorkplaceByCode(workplace_code),
        course_service_1.default.GetCourseByCode(course_code),
    ]);
    const id_mentor = _mentor?._id;
    const id_workplace = _workplace?._id;
    const id_course = _course?._id;
    const number_week = total_session / Number(session_per_week);
    const day_start = new Date(start_at).getDay();
    const weekStart = GetWeekNumber(new Date(start_at));
    const holidays = [
        new Date("2023-01-01"),
        new Date("2023-02-01"),
        new Date("2023-02-02"),
        new Date("2023-02-03"),
        new Date("2023-02-04"),
        new Date("2023-02-05"),
        new Date("2023-02-06"),
        new Date("2023-02-07"),
        new Date("2023-04-15"),
        new Date("2023-04-30"),
        new Date("2023-05-01"),
        new Date("2023-09-02"),
    ];
    const start = schedule.indexOf(day_start);
    let week_end;
    let date_end;
    if (start === 0 && Number.isInteger(number_week)) {
        week_end = weekStart + number_week;
        date_end = (0, moment_1.default)()
            .week(week_end)
            .day(schedule[schedule.length - 1])
            .toDate();
    }
    else if (start > 0 &&
        (total_session % Number(session_per_week)) + start > schedule.length) {
        week_end = weekStart + number_week + 1;
        const day = schedule[(total_session % Number(session_per_week)) +
            start -
            Number(session_per_week)];
        date_end = (0, moment_1.default)().week(week_end).day(day).toDate();
    }
    else if (start > 0 &&
        (total_session % Number(session_per_week)) + start < schedule.length) {
        week_end = weekStart + number_week + 1;
        const day = (total_session % Number(session_per_week)) + start;
        date_end = (0, moment_1.default)().week(week_end).day(day).toDate();
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
            date_end = (0, moment_1.default)()
                .week(week + Number(week_end) + 1)
                .day(schedule[(day + stt) % Number(session_per_week)])
                .toDate();
        }
        else {
            date_end = (0, moment_1.default)()
                .week(week + Number(week_end))
                .day(schedule[day + stt])
                .toDate();
        }
    }
    const formatDate = (0, moment_1.default)(date_end).format("DD/MM/YYYY");
    return await classRepository.CreateClass(id_mentor, id_workplace, id_course, formatDate, payload);
};
function GetWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
const GetAllClass = async (page, limit) => {
    return await classRepository.FindAllInfoAndPagination(page, limit, [
        "mentor",
        "workplace",
        "course",
    ]);
};
const GetClassById = async (id) => {
    return await classRepository.FindById(id, ["mentor", "workplace", "course"]);
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
const GetClassByCourseId = async (code) => {
    return await classRepository.FindClassByCourseId(code);
};
const GetClassByCondition = async (filter) => {
    return await classRepository.FindByCondition(filter, [
        "mentor",
        "workplace",
        "course",
    ]);
};
const SearchClassByCondition = async (page, limit, filter, feild) => {
    return await classRepository.Search(page, limit, ["workplace", "course", "mentor"], filter, feild);
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
};
//# sourceMappingURL=class.service.js.map