import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import lessonService from "@/services/lesson.service";
import registCourseService from "@/services/regist.course.service";
import sessionService from "@/services/session.service";
import { Request, Response } from "express";

const CreateNewLesson = async (req: Request, res: Response) => {
  const payload = req.body;
  const { session } = payload;
  try {
    const newLesson = await lessonService.CreateLesson(session as string, payload);
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.LESSON.CREATE_SUCCES, 200, newLesson));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.LESSON.WRONG, 400));
  }
};

const GetLesson = async (req: Request, res: Response) => {
  const { ss_code, page, limit } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    if (ss_code) {
      const all = await lessonService.GetLessonBySessionCode(ss_code as string, p, l);
      if (all.length === 0) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.LESSON.NOT_FOUND, 404));
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.LESSON.FOUND_SUCCESS, 200, all));
    } else if (page && limit) {
      const all = await lessonService.GetAllLesson(p, l);
      if (all.length === 0) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.LESSON.NOT_FOUND, 404));
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.LESSON.FOUND_SUCCESS, 200, all));
    } else {
      const all = await lessonService.GetAllLesson(1, 10);
      if (all.length === 0) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.LESSON.NOT_FOUND, 404));
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.LESSON.FOUND_SUCCESS, 200, all));
    }
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.LESSON.WRONG, 404));
  }
};

const UpdateLesson = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { payload } = req.body;
  try {
    const exist = await lessonService.UpdateLessonById(id as string, payload);
    if (!exist) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.LESSON.NOT_FOUND, 404));
    }
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.LESSON.FOUND_SUCCESS, 200));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.LESSON.WRONG, 400));
  }
};

const DeleteLesson = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const found = await lessonService.DeletedLessonById(id as string);
    if (!found) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.LESSON.NOT_FOUND, 404));
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.LESSON.DELETE_SUCCESS, 200));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.LESSON.WRONG, 400));
  }
};

export default { CreateNewLesson, GetLesson, UpdateLesson, DeleteLesson };
