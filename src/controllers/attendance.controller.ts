import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import attendanceService from "@/services/attendance.service";
import attendanceStudentService from "@/services/attendance.student.service";
import classService from "@/services/class.service";
import { Request, Response } from "express";

const CreateNewAttendance = async (req: Request, res: Response) => {
  const payload = req.body;
  try {
    const newAttendance = await attendanceService.CreateAttendance(
      payload.session_code,
      payload.class_code,
      payload,
    );
    res.json(
      new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.CREATE_SUCCES, 200, newAttendance),
    );
  } catch (error) {
    return res.json(
      res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.WRONG, 400)),
    );
  }
};

const GetAttendance = async (req: Request, res: Response) => {
  const { page, limit, class_code, day, email } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    if (page && limit && class_code) {
      const result = await attendanceService.GetAttendanceByClassCode(
        class_code as string,
        p,
        l,
      );
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404));
      }
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, result));
    } else if (class_code && day) {
      const attendance = await attendanceService.GetAttendanceByClassCodeAndDay(
        class_code as string,
        Number(day),
      );
      if (!attendance) {
        return res.json(
          new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404),
        );
      }
      res.json(
        new HttpResponseData(
          RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS,
          200,
          attendance,
        ),
      );
    } else if (page && limit && day) {
      const result = await attendanceService.GetAttendanceByDay(
        Number(day),
        p,
        l,
      );
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404));
      }
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, result));
    } else if (email && page && limit) {
      const attendances =
        await attendanceStudentService.GetAttendanceByEmailStudent(
          email as string,
          p,
          l,
        );
      if (!attendances) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, {
          list: attendances,
          page: p,
          count: attendances.length,
        }),
      );
    } else {
      const attendances = await attendanceStudentService.GetAllAttendance(
        1,
        10,
      );
      if (!attendances) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, {
          list: attendances,
          page: p,
          count: attendances.length,
        }),
      );
    }
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.WRONG, 404));
  }
};

const UpdateAttendance = async (req: Request, res: Response) => {
  const { id } = req.query;
  const update = req.body;
  try {
    const classUpdated = await classService.UpdateOneClass(
      id as string,
      update,
    );
    if (!classUpdated) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404));
    }
    res.json(
      new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.UPDATE_SUCCESS, 200, classUpdated),
    );
  } catch (error: any) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.WRONG, 400));
  }
};

const DeleteAttendance = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const classDeleted = await classService.DeleteClassById(id as string);
    if (!classDeleted) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404));
    }
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.DELETE_SUCCESS, 200));
  } catch (error: any) {
    return res.json(
      new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.WRONG, 400, error.message),
    );
  }
};

export default {
  GetAttendance,
  CreateNewAttendance,
  UpdateAttendance,
  DeleteAttendance,
};
