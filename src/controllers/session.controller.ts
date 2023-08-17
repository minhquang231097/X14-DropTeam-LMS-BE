import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import sessionService from "@/services/session.service";
import { Request, Response } from "express";

const CreateNewSession = async (req: Request, res: Response) => {
  const payload = req.body;
  const { course_code, class_code, session_code } = payload;
  try {
    const exist = await sessionService.GetSessionByCode(session_code);
    if (exist) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.CODE_EXIST, 403));
    const session = await sessionService.CreateSession(course_code, class_code, payload);
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.SESSION.CREATE_SUCCES, 200, session));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.WRONG, 400));
  }
};

const GetSession = async (req: Request, res: Response) => {
  const { page, limit, _course, _class, id } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    if (id) {
      const found = await sessionService.GetSessionById(id as string);
      if (found.length === 0) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.NOT_FOUND, 404));
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.SESSION.FOUND_SUCCESS, 200, found));
    } else if (_course) {
      const session = await sessionService.GetSessionByCourseCode(_course as string);
      if (session.length === 0) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.NOT_FOUND, 404));
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.SESSION.FOUND_SUCCESS, 200, session));
    } else if (_class) {
      const found: any = await sessionService.GetSessionByClassCode(_class as string);
      if (found.length === 0) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.NOT_FOUND, 404));
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.SESSION.FOUND_SUCCESS, 200, found));
    } else if (page && limit) {
      const all = await sessionService.GetAllSession(p, l);
      if (!all) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.NOT_FOUND, 404));
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.SESSION.FOUND_SUCCESS, 200, all));
    } else {
      const all = await sessionService.GetAllSession(1, 10);
      if (!all) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.NOT_FOUND, 404));
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.SESSION.FOUND_SUCCESS, 200, all));
    }
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.WRONG, 400));
  }
};

const UpdateSession = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const session = await sessionService.UpdateSessionById(id as string, payload);
    if (!session) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.NOT_FOUND, 404));
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.SESSION.UPDATE_SUCCESS, 200));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.WRONG, 400));
  }
};

const DeleteSession = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const session = await sessionService.DeletedCourse(id as string);
    if (!session) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.NOT_FOUND, 404));
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.SESSION.DELETE_SUCCESS, 200));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.SESSION.WRONG, 400));
  }
};

export default { CreateNewSession, GetSession, UpdateSession, DeleteSession };
