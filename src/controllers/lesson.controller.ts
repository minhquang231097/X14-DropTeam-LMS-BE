import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import courseService from "@/services/course.service";
import lessonService from "@/services/lesson.service";
import sessionService from "@/services/session.service";
import { Request, Response } from "express";
import mongoose from "mongoose";
import * as console from "console";

const LIMIT_PAGE_LESSON = 10;

const CreateNewLesson = async (req: Request, res: Response) => {
  const payload = req.body;
  const { course_id } = payload;
  try {
    const _course = await courseService.GetCourseById(course_id as string);
    if (!_course) return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.LESSON.NOT_FOUND, 404));
    const newLesson = await lessonService.CreateLesson(payload);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.LESSON.CREATE_SUCCES, 200, newLesson));
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.LESSON.WRONG, 400));
  }
};

const GetLesson = async (req: Request, res: Response) => {
  const { course_id, search, page, limit } = req.query;
  const { sortBy } = req.body;
  const p = Number(page);
  const l = Number(limit);
  try {
    if (!course_id || mongoose.isValidObjectId(course_id)) {
      const countDoc = await lessonService.CountLesson();
      if (course_id) {
        const num = await lessonService.GetLessonByCourseId(course_id as string);
        let result;
        if (p === undefined && l === undefined) {
          result = await lessonService.GetLessonByCourseId(course_id as string, 1, LIMIT_PAGE_LESSON, sortBy);
        } else {
          result = await lessonService.GetLessonByCourseId(course_id as string, p, l, sortBy);
        }
        if (result.length === 0)
          return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.LESSON.NOT_FOUND, 404));
        res
          .status(200)
          .json(
            new HttpResponseData(
              RESPONSE_CONFIG.MESSAGE.LESSON.FOUND_SUCCESS,
              200,
              result,
              result.length,
              num.length,
              p,
              Math.ceil(num.length / l),
            ),
          );
      } else if (search) {
        const num = await lessonService.SearchLessonByCondition(search as string);
        let result;
        if (p === undefined && l === undefined) {
          result = await lessonService.SearchLessonByCondition(search as string, 1, LIMIT_PAGE_LESSON, sortBy);
        } else {
          result = await lessonService.SearchLessonByCondition(search as string, p, l, sortBy);
        }
        if (result.length === 0)
          return res.status(200).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.LESSON.FOUND_NO_DATA, 200));
        res
          .status(200)
          .json(
            new HttpResponseData(
              RESPONSE_CONFIG.MESSAGE.LESSON.FOUND_SUCCESS,
              200,
              result,
              result.length,
              num.length,
              p,
              Math.ceil(num.length / l),
            ),
          );
      } else if (page && limit) {
        const result = await lessonService.GetAllLesson(p, l, sortBy);
        if (result.length === 0)
          return res.status(200).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.LESSON.FOUND_NO_DATA, 200));
        res
          .status(200)
          .json(
            new HttpResponseData(
              RESPONSE_CONFIG.MESSAGE.LESSON.FOUND_SUCCESS,
              200,
              result,
              result.length,
              countDoc,
              p,
              Math.ceil(countDoc / l),
            ),
          );
      } else {
        const result = await lessonService.GetAllLesson(1, LIMIT_PAGE_LESSON, sortBy);
        if (result.length === 0)
          return res.status(200).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.LESSON.FOUND_NO_DATA, 200));
        res
          .status(200)
          .json(
            new HttpResponseData(
              RESPONSE_CONFIG.MESSAGE.LESSON.FOUND_SUCCESS,
              200,
              result,
              result.length,
              countDoc,
              1,
              Math.ceil(countDoc / 10),
            ),
          );
      }
    } else {
      return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.LESSON.NOT_FOUND, 404));
    }
  } catch (error) {
    return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.LESSON.WRONG, 404));
  }
};

const GetLessonInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const found = await lessonService.GetLessonById(id);
    if (!found) return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.LESSON.NOT_FOUND, 404));
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.LESSON.FOUND_SUCCESS, 200, found));
  } catch (error) {
    return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.LESSON.WRONG, 400));
  }
};

const UpdateLesson = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const exist = await lessonService.GetLessonById(id);
    if (!exist) return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.LESSON.NOT_FOUND, 404));
    await lessonService.UpdateLessonById(id, payload);
    const newLesson = await lessonService.GetLessonById(id);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.LESSON.FOUND_SUCCESS, 200, newLesson));
  } catch (error) {
    return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.LESSON.WRONG, 400));
  }
};

const DeleteLesson = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exist = await lessonService.GetLessonById(id as string);
    if (!exist) return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.LESSON.NOT_FOUND, 404));
    await lessonService.DeletedLessonById(id as string);
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.LESSON.DELETE_SUCCESS, 200));
  } catch (error) {
    return res.status(400).json(new HttpException(RESPONSE_CONFIG.MESSAGE.LESSON.WRONG, 400));
  }
};

export default {
  CreateNewLesson,
  GetLesson,
  UpdateLesson,
  DeleteLesson,
  GetLessonInfo,
};
