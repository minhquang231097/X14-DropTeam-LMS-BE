import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import attendanceService from "@/services/attendance.service";
import attendanceStudentService from "@/services/attendance.student.service";
import { Request, Response } from "express";
import mongoose from "mongoose";

const LIMIT_PAGE_ATTENDANCE = 10;

const CreateListAttendance = async (req: Request, res: Response) => {
  const payload = req.body;
  const { list } = payload;
  try {
    if (list.length === 0)
      return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.CREATE_SUCCES, 400));
    await attendanceStudentService.CreateListAttendance(list);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.CREATE_SUCCES, 200));
  } catch (error) {
    res.status(400).send(res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.WRONG, 400)));
  }
};

const GetAttendance = async (req: Request, res: Response) => {
  const { page, limit, class_id, session_id, student_id, sortFeild, sortOrder } = req.query;
  const p: number = Number(page);
  const l: number = Number(limit);
  try {
    const sortBy = { [sortFeild as string]: Number(sortOrder) };
    if (
      (!session_id || mongoose.isValidObjectId(session_id)) &&
      (!class_id || mongoose.isValidObjectId(class_id)) &&
      (!student_id || mongoose.isValidObjectId(student_id))
    ) {
      const countDoc: number = await attendanceService.CountAttendance();

      if (class_id) {
        const num = await attendanceService.GetAttendanceByClassId(class_id as string);
        let result;
        if (p === undefined && l === undefined) {
          result = await attendanceService.GetAttendanceByClassId(class_id as string, 1, LIMIT_PAGE_ATTENDANCE, sortBy);
        } else {
          result = await attendanceService.GetAttendanceByClassId(class_id as string, p, l, sortBy);
        }
        if (result.length === 0)
          return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404));
        res
          .status(200)
          .json(
            new HttpResponseData(
              RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS,
              200,
              result,
              result.length,
              num.length,
              p,
              Math.ceil(num.length / l),
            ),
          );
      } else if (session_id) {
        const num = await attendanceService.GetAttendanceBySessionId(session_id as string);
        let result;
        if (p === undefined && l === undefined) {
          result = await attendanceService.GetAttendanceBySessionId(
            session_id as string,
            1,
            LIMIT_PAGE_ATTENDANCE,
            sortBy,
          );
        } else {
          result = await attendanceService.GetAttendanceBySessionId(session_id as string, p, l, sortBy);
        }
        if (result.length === 0)
          return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404));
        res
          .status(200)
          .json(
            new HttpResponseData(
              RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS,
              200,
              result,
              result.length,
              num.length,
              p,
              Math.ceil(num.length / l),
            ),
          );
      } else if (student_id) {
        const num = await attendanceStudentService.GetAttendanceByStudentId(student_id as string);
        let result;
        if (p === undefined && l === undefined) {
          result = await attendanceStudentService.GetAttendanceByStudentId(
            student_id as string,
            1,
            LIMIT_PAGE_ATTENDANCE,
            sortBy,
          );
        } else {
          result = await attendanceStudentService.GetAttendanceByStudentId(student_id as string, p, l, sortBy);
        }
        if (result.length === 0)
          return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404));
        res
          .status(200)
          .json(
            new HttpResponseData(
              RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS,
              200,
              result,
              result.length,
              num.length,
              p,
              Math.ceil(num.length / l),
            ),
          );
      } else if (page && limit) {
        const result = await attendanceService.GetAllAttendance(p, l, sortBy);
        if (result.length === 0)
          return res.status(200).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_NO_DATA, 200));
        res
          .status(200)
          .json(
            new HttpResponseData(
              RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS,
              200,
              result,
              result.length,
              countDoc,
              p,
              Math.ceil(countDoc / l),
            ),
          );
      } else {
        const result = await attendanceService.GetAllAttendance(1, LIMIT_PAGE_ATTENDANCE, sortBy);
        if (result.length === 0)
          return res.status(200).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_NO_DATA, 200));
        res
          .status(200)
          .json(
            new HttpResponseData(
              RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS,
              200,
              result,
              result.length,
              countDoc,
              1,
              Math.ceil(countDoc / LIMIT_PAGE_ATTENDANCE),
            ),
          );
      }
    } else {
      return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
    }
  } catch (error) {
    res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.WRONG, 400));
  }
};

const GetInfoAttendanceStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { page, limit } = req.query;
  const p = Number(page);
  const l = Number(limit);

  try {
    const result = await attendanceStudentService.GetAttendanceByStudentId(id as string, p, l);
    if (result.length > 0)
      res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, result));
    res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404, result));
  } catch (error: Error | any) {
    res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.WRONG, 400, error.message));
  }
};

const UpdateAttendance = async (req: Request, res: Response) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const exist = await attendanceService.GetAttendanceById(id as string);
    if (!exist) res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404));
    await attendanceService.UpdateAttendance(id as string, update);
    const newAttendance = await attendanceService.UpdateAttendance(id as string, update);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.UPDATE_SUCCESS, 200, newAttendance));
  } catch (error: any) {
    res.status(400).json(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.WRONG, 400));
  }
};

const DeleteAttendance = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exist = await attendanceService.GetAttendanceById(id as string);
    if (!exist) return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404));
    await attendanceService.DeleteAttendanceById(id as string);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.DELETE_SUCCESS, 200));
  } catch (error: any) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.WRONG, 400));
  }
};

export default {
  GetAttendance,
  CreateListAttendance,
  UpdateAttendance,
  DeleteAttendance,
  GetInfoAttendanceStudent,
};
