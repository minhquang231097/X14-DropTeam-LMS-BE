import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import attendanceService from "@/services/attendance.service";
import classService from "@/services/class.service";
import courseService from "@/services/course.service";
import sessionService from "@/services/session.service";
import { Request, Response } from "express";

const CreateSessionWithAttendance = async (req: Request, res: Response) => {
  const payload = req.body;
  const { course_id, class_id, session_code } = payload;
  try {
    const [_course, _class, _session] = await Promise.all([
      courseService.GetCourseById(course_id),
      classService.GetClassById(class_id),
      sessionService.GetSessionByCode(session_code),
    ]);
    if (!_course || !_class || _session) return res.status(403).send(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.WRONG, 403));
    const session = await sessionService.CreateSession(payload);
    await attendanceService.CreateAttendance(_session._id, _class._id);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.SESSION.CREATE_SUCCES, 200, session));
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.WRONG, 400));
  }
};

const GetSession = async (req: Request, res: Response) => {
  const { page, limit, course_id, class_id } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    const countDoc = await sessionService.CountSession();
    if (course_id) {
      const num = await sessionService.GetSessionByCourseId(course_id as string);
      const result = await sessionService.GetSessionByCourseId(course_id as string, p, l);
      if (result.length === 0) return res.status(200).send(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.FOUND_NO_DATA, 200));
      res
        .status(200)
        .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.SESSION.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
    } else if (class_id) {
      const num: any = await sessionService.GetSessionByClassId(class_id as string);
      const result: any = await sessionService.GetSessionByClassId(class_id as string, p, l);
      if (result.length === 0) return res.status(200).send(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.FOUND_NO_DATA, 200));
      res
        .status(200)
        .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.SESSION.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
    } else if (page && limit) {
      const result = await sessionService.GetAllSession(p, l);
      if (result.length === 0) return res.status(200).send(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.FOUND_NO_DATA, 200));
      res
        .status(200)
        .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.SESSION.FOUND_SUCCESS, 200, result, result.length, countDoc, p, Math.ceil(countDoc / l)));
    } else {
      const result = await sessionService.GetAllSession(1, 10);
      if (result.length === 0) return res.status(200).send(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.FOUND_NO_DATA, 200));
      res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.SESSION.FOUND_SUCCESS, 200, result, result.length, countDoc, 1, Math.ceil(countDoc / 10)));
    }
  } catch (error) {
    return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.WRONG, 404));
  }
};

const GetSessionInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exist = await sessionService.GetSessionById(id as string);
    if (!exist) return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.NOT_FOUND, 404));
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.SESSION.FOUND_SUCCESS, 200, exist));
  } catch (error) {
    return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.NOT_FOUND, 404));
  }
};

const UpdateSession = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const exist = await sessionService.GetSessionById(id as string);
    if (!exist) return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.NOT_FOUND, 404));
    await sessionService.UpdateSessionById(id as string, payload);
    const newSession = await sessionService.GetSessionById(id as string)
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.SESSION.UPDATE_SUCCESS, 200, newSession));
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.WRONG, 400));
  }
};

const DeleteSession = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exist = await sessionService.GetSessionById(id as string);
    if (!exist) return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.NOT_FOUND, 404));
    await sessionService.DeletedCourse(id as string);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.SESSION.DELETE_SUCCESS, 200));
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.WRONG, 400));
  }
};

export default { CreateSessionWithAttendance, GetSession, UpdateSession, DeleteSession, GetSessionInfo };
