import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import lessonService from "@/services/lesson.service";
import registCourseService from "@/services/regist.course.service";
import sessionService from "@/services/session.service";
import { Request, Response } from "express";

const CreateNewLesson = async (req: Request, res: Response) => {
  const { code } = req.query;
  const payload = req.body;
  try {
    const newLesson = await lessonService.CreateLesson(code as string, payload);
    res.json(
      new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, newLesson),
    );
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
  }
};

const GetLesson = async (req: Request, res: Response) => {
  const { ss_code, page, limit } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    if (ss_code && page && limit) {
      const all = await lessonService.GetLessonBySessionCode(
        ss_code as string,
        p,
        l,
      );
      if (!all)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, all));
    } else if (page && limit) {
      const all = await lessonService.GetAllLesson(p, l);
      if (!all)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, all));
    } else {
      const all = await lessonService.GetAllLesson(1, 10);
      if (!all)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, all));
    }
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
  }
};

const UpdateLesson = async (req: Request, res: Response) => {
  const { id } = req.query;
  const { payload } = req.body;
  try {
    const exist = await lessonService.UpdateLessonById(id as string, payload);
    if (!exist) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
    }
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
  }
};

const DeleteLesson = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const found = await lessonService.DeletedLessonById(id as string);
    if (!found)
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
  }
};

export default { CreateNewLesson, GetLesson, UpdateLesson, DeleteLesson };
