import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import attendanceService from "@/services/attendance.service";
import attendanceStudentService from "@/services/attendance.student.service";
import classService from "@/services/class.service";
import { Request, Response } from "express";

const CreateNewAttendance = async (req: Request, res: Response) => {
  const payload = req.body;
  const { session_code, class_code } = payload;
  try {
    const newAttendance = await attendanceService.CreateAttendance(session_code, class_code, payload);
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.CREATE_SUCCES, 200, newAttendance));
  } catch (error) {
    return res.json(res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.WRONG, 400)));
  }
};

const GetAttendance = async (req: Request, res: Response) => {
  const { page, limit, class_code, day, email } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    const countDoc = await attendanceService.CountAttendance();
    if (class_code && day) {
      const result = await attendanceService.GetAttendanceByClassCodeAndDay(class_code as string, Number(day));
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404));
      }
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, result));
    } else if (class_code) {
      const num = await attendanceService.GetAttendanceByClassCode(class_code as string);
      const result = await attendanceService.GetAttendanceByClassCode(class_code as string, p, l);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, {
          list: result,
          page: p,
          total: countDoc,
          count: result.length,
          total_page: Math.ceil(num.length / l),
        }),
      );
    } else if (day) {
      const num = await attendanceService.GetAttendanceByDay(Number(day));
      const result = await attendanceService.GetAttendanceByDay(Number(day), p, l);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, {
          list: result,
          page: p,
          total: countDoc,
          count: result.length,
          total_page: Math.ceil(num.length / l),
        }),
      );
    } else if (email) {
      const num = await attendanceStudentService.GetAttendanceByEmailStudent(email as string);
      const result = await attendanceStudentService.GetAttendanceByEmailStudent(email as string, p, l);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, {
          list: result,
          page: p,
          total: countDoc,
          count: result.length,
          total_page: Math.ceil(num.length / l),
        }),
      );
    } else {
      const result = await attendanceService.GetAttendance(1, 10);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, {
          list: result,
          page: 1,
          total: countDoc,
        }),
      );
    }
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.WRONG, 400));
  }
};

const UpdateAttendance = async (req: Request, res: Response) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const classUpdated = await classService.UpdateOneClass(id as string, update);
    if (!classUpdated) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404));
    }
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.UPDATE_SUCCESS, 200, classUpdated));
  } catch (error: any) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.WRONG, 400));
  }
};

const DeleteAttendance = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const classDeleted = await classService.DeleteClassById(id as string);
    if (!classDeleted) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404));
    }
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.DELETE_SUCCESS, 200));
  } catch (error: any) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.WRONG, 400, error.message));
  }
};

export default {
  GetAttendance,
  CreateNewAttendance,
  UpdateAttendance,
  DeleteAttendance,
};
