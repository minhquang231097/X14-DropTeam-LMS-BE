import { Request, Response } from "express";
import CourseService from "@/services/course.service";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import HttpResponseData from "@/common/httpResponseData";
import HttpException from "@/common/httpException";
import { Course, ICourse } from "@/models/course.model";
import courseService from "@/services/course.service";

const CreateCourse = async (req: Request, res: Response) => {
  const payload = req.body;
  const { workplace } = payload;
  try {
    const newCourse: ICourse = await CourseService.CreateCourse(workplace, payload);
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.CREATE_SUCCES, 200, newCourse));
  } catch (error: any) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400, error.message));
  }
};

const GetCourse = async (req: Request, res: Response) => {
  const { code, id, page, limit, search } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    const countDoc = await CourseService.GetTotalCourse();
    if (id) {
      const result = await CourseService.GetCourseById(id as string);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
      }
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, result));
    } else if (code) {
      const result = await CourseService.GetCourseByCode(code as string);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
      }
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, result));
    } else if (search) {
      const num = await courseService.SearchCourseByCondition(search as string);
      const result = await courseService.SearchCourseByCondition(search as string, p, l);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, {
          list: result,
          total: countDoc,
          page: p,
          count: result.length,
          total_page: Math.ceil(num.length / l),
        }),
      );
    } else if (page && limit) {
      const result = await CourseService.GetAllCourse(p, l);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, {
          list: result,
          page: p,
          count: result.length,
          total: countDoc,
          total_page: Math.ceil(countDoc / l),
        }),
      );
    } else {
      const result = await CourseService.GetAllCourse(1, 10);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, {
          list: result,
          page: 1,
          total: countDoc,
        }),
      );
    }
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400));
  }
};

const UpdateCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const update = req.body;
    const courseExist = await CourseService.GetCourseById(id as string);
    if (!courseExist) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 400));
    }
    const updateCourse = await CourseService.UpdateCourse(id as string, update);
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.UPDATE_SUCCESS, 200, updateCourse));
  } catch (error: any) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400, error.message));
  }
};

const DeletedCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const courseExist = await CourseService.GetCourseById(id as string);
    if (!courseExist) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 400));
    }
    const deleteCourse = await CourseService.DeletedCourse(id as string);
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.DELETE_SUCCESS, 200, deleteCourse));
  } catch (error: any) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400, error.message));
  }
};

const DeletedAllCourse = async (req: Request, res: Response) => {
  try {
    const courseDeleted = await Course.deleteMany();
    if (!courseDeleted) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 400));
    }
    res.sendStatus(200);
  } catch (error: any) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400, error.message));
  }
};

export default {
  CreateCourse,
  UpdateCourse,
  DeletedCourse,
  DeletedAllCourse,
  GetCourse,
};
