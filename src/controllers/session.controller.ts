import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import sessionService from "@/services/session.service";
import { Request, Response } from "express";

const CreateNewSession = async (req: Request, res: Response) => {
  const payload = req.body;
  const { course_code, class_code } = payload;
  try {
    const session = await sessionService.CreateSession(
      course_code as string,
      class_code as string,
      payload,
    );
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, session));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
  }
};

const GetSession = async (req: Request, res: Response) => {
  const { page, limit, _course, _class, id } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    if (id) {
      const found = await sessionService.GetSessionById(id as string);
      if (found.length === 0)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, found));
    } else if (_course) {
      const session = await sessionService.GetSessionByCourseCode(
        _course as string,
      );
      if (session.length === 0)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, session),
      );
    } else if (_class) {
      const found: any = await sessionService.GetSessionByClassCode(
        _class as string,
      );
      if (found.length === 0)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, found));
    } else if (page && limit) {
      const all = await sessionService.GetAllSession(p, l);
      if (!all)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, all));
    } else {
      const all = await sessionService.GetAllSession(1, 10);
      if (!all)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, all));
    }
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
  }
};

const UpdateSession = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const session = await sessionService.UpdateSessionById(
      id as string,
      payload,
    );
    if (!session)
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
  }
};

const DeleteSession = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const session = await sessionService.DeletedCourse(id as string);
    if (!session)
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
  }
};

export default { CreateNewSession, GetSession, UpdateSession, DeleteSession };
