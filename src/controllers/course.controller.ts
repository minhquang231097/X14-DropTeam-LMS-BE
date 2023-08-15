import { Request, Response } from "express";
import CourseService from "@/services/course.service";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import HttpResponseData from "@/common/httpResponseData";
import HttpException from "@/common/httpException";
import { Course, ICourse } from "@/models/course.model";
import courseService from "@/services/course.service";

const CreateCourse = async (req: Request, res: Response) => {
  const payload = req.body;
  const { workplace_code } = payload;
  try {
    const newCourse: ICourse = await CourseService.CreateCourse(
      workplace_code,
      payload,
    );
    res.json(
      new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.CREATE_SUCCES, 200, newCourse),
    );
  } catch (error: any) {
    return res.json(
      new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400, error.message),
    );
  }
};

const GetCourse = async (req: Request, res: Response) => {
  const { code, id, page, limit, search } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    const total = await CourseService.GetTotalCourse();
    if (id) {
      const courseExist = await CourseService.GetCourseById(id as string);
      if (!courseExist) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, courseExist),
      );
    } else if (code) {
      const courseExist = await CourseService.GetCourseByCode(code as string);
      if (!courseExist) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, courseExist),
      );
    } else if (search) {
      const allCourses = await courseService.SearchCourseByCondition(
        p,
        l,
        search as string,
      );
      if (!allCourses) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, {
          allCourses,
          total,
          page: p,
        }),
      );
    } else if (search) {
      const allCourses = await courseService.SearchCourseByCondition(
        p,
        l,
        search as string,
      );
      if (!allCourses) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, {
          allCourses,
          total,
          page: p,
        }),
      );
    } else if (page && limit) {
      const allCourses = await CourseService.GetAllCourse(p, l);
      if (!allCourses) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, {
          allCourses,
          total,
          page: p,
        }),
      );
    } else {
      const allCourses = await CourseService.GetAllCourse(1, 10);
      if (!allCourses) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, {
          allCourses,
          total,
          page: p,
        }),
      );
    }
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
  }
};

const UpdateCourse = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const update = req.body;
    const courseExist = await CourseService.GetCourseById(id as string);
    if (!courseExist) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
    }
    const updateCourse = await CourseService.UpdateCourse(id as string, update);
    res.json(
      new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, updateCourse),
    );
  } catch (error: any) {
    return res.json(
      new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message),
    );
  }
};

const DeletedCourse = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const courseExist = await CourseService.GetCourseById(id as string);
    if (!courseExist) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
    }
    const deleteCourse = await CourseService.DeletedCourse(id as string);
    res.json(
      new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, deleteCourse),
    );
  } catch (error: any) {
    return res.json(
      new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message),
    );
  }
};

const DeletedAllCourse = async (req: Request, res: Response) => {
  try {
    const courseDeleted = await Course.deleteMany();
    if (!courseDeleted) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

export default {
  CreateCourse,
  UpdateCourse,
  DeletedCourse,
  DeletedAllCourse,
  GetCourse,
};
