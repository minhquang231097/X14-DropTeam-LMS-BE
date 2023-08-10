import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import sessionService from "@/services/session.service";
import { Request, Response } from "express";

const CreateNewSession = async (req: Request, res: Response) => {
  const payload = req.body;
  const { course_code } = payload;
  try {
    const session = await sessionService.CreateSession(course_code, payload);
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, session));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
  }
};

const GetSession = async (req: Request, res: Response) => {
  const { page, limit, course_code, class_code } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    if (course_code) {
      const session = await sessionService.GetSessionByCourseCode(
        course_code as string,
      );
      if (!session)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, session),
      );
    }else if(class_code){
      const found = await sessionService.GetSessionByClassCode(
        class_code as string,
      );
      if (!found)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, found),
      );
    } else if (page && limit) {
      const all = await sessionService.GetAllSession(p, l);
      if (!all)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200,all));
    }
    return res.json(
      new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400),
    );
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
  }
};

const UpdateSession = async (req: Request, res: Response) => {
  const { id } = req.query;
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
  const { id } = req.query;
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
