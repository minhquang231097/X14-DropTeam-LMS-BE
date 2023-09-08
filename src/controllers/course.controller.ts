import { Request, Response } from "express";
import CourseService from "@/services/course.service";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import HttpResponseData from "@/common/httpResponseData";
import HttpException from "@/common/httpException";
import { ICourse } from "@/models/course.model";
import courseService from "@/services/course.service";

const LIMIT_PAGE_COURSE = 10;

const CreateCourse = async (req: Request, res: Response) => {
  const payload = req.body;
  const { course_code } = payload;
  try {
    const _course = await CourseService.GetCourseByCode(course_code);
    if (_course) return res.status(403).send(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.CODE_EXIST, 403));
    const newCourse: ICourse = await CourseService.CreateCourse(payload);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.CREATE_SUCCES, 200, newCourse));
  } catch (error: any) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400, error.message));
  }
};

const GetCourse = async (req: Request, res: Response) => {
  const { page, limit, search, sortField, sortOrder, level, rate } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    const sortBy = { [sortField as string]: Number(sortOrder) };
    const countDoc = await CourseService.GetTotalCourse();
    if (search) {
      const num = await courseService.SearchCourseByCondition(search as string);
      let result;
      if (p === undefined && l === undefined) {
        result = await courseService.SearchCourseByCondition(search as string, 1, LIMIT_PAGE_COURSE, sortBy);
      } else {
        result = await courseService.SearchCourseByCondition(search as string, p, l, sortBy);
      }
      if (result.length === 0)
        return res.status(200).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_NO_DATA, 200));
      res
        .status(200)
        .json(
          new HttpResponseData(
            RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS,
            200,
            result,
            result.length,
            num.length,
            p,
            Math.ceil(num.length / l),
          ),
        );
    } else if (level) {
      const num = await courseService.GetCoureByLevel(level as string);
      let result;
      if (p === undefined && l === undefined) {
        result = await courseService.GetCoureByLevel(level as string, 1, LIMIT_PAGE_COURSE, sortBy);
      } else {
        result = await courseService.GetCoureByLevel(level as string, p, l, sortBy);
      }
      if (result.length === 0)
        return res.status(200).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_NO_DATA, 200));
      res
        .status(200)
        .json(
          new HttpResponseData(
            RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS,
            200,
            result,
            result.length,
            num.length,
            p,
            Math.ceil(num.length / l),
          ),
        );
    } else if (rate) {
      const num = await courseService.GetCoureByRate(Number(rate));
      let result;
      if (p === undefined && l === undefined) {
        result = await courseService.GetCoureByRate(Number(rate), 1, LIMIT_PAGE_COURSE, sortBy);
      } else {
        result = await courseService.GetCoureByRate(Number(rate), p, l, sortBy);
      }
      if (result.length === 0)
        return res.status(200).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_NO_DATA, 200));
      res
        .status(200)
        .json(
          new HttpResponseData(
            RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS,
            200,
            result,
            result.length,
            num.length,
            p,
            Math.ceil(num.length / l),
          ),
        );
    } else if (page && limit) {
      const result = await CourseService.GetAllCourse(p, l, sortBy);
      if (result.length === 0)
        return res.status(200).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_NO_DATA, 200));
      res
        .status(200)
        .json(
          new HttpResponseData(
            RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS,
            200,
            result,
            result.length,
            countDoc,
            p,
            Math.ceil(countDoc / l),
          ),
        );
    } else {
      const result = await CourseService.GetAllCourse(1, LIMIT_PAGE_COURSE, sortBy);
      if (result.length === 0)
        return res.status(200).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_NO_DATA, 200));
      res
        .status(200)
        .json(
          new HttpResponseData(
            RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS,
            200,
            result,
            result.length,
            countDoc,
            1,
            Math.ceil(countDoc / LIMIT_PAGE_COURSE),
          ),
        );
    }
  } catch (error) {
    return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 404));
  }
};

const GetCourseInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exist = await CourseService.GetCourseById(id as string);
    if (!exist) return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, exist));
  } catch (error) {
    return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 404));
  }
};

const UpdateCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const exist = await CourseService.GetCourseById(id as string);
    if (!exist) return res.status(404).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
    await CourseService.UpdateCourse(id as string, update);
    const newCourse = await CourseService.GetCourseById(id as string);
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.UPDATE_SUCCESS, 200, newCourse));
  } catch (error: any) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400, error.message));
  }
};

const DeletedCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exist = await CourseService.GetCourseById(id as string);
    if (!exist) return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 400));
    await CourseService.DeletedCourse(id as string);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.DELETE_SUCCESS, 200));
  } catch (error: any) {
    return res.status(400).json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400));
  }
};

export default {
  CreateCourse,
  UpdateCourse,
  DeletedCourse,
  GetCourse,
  GetCourseInfo,
};
