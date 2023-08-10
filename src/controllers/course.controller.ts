import { Request, Response } from "express";
import CourseService from "@/services/course.service";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import HttpResponseData from "@/common/httpResponseData";
import HttpException from "@/common/httpException";
import { Course, ICourse } from "@/models/course.model";

const CreateCourse = async (req: Request, res: Response) => {
  const payload = req.body;
  try {
    const newCourse: ICourse = await CourseService.CreateCourse(payload);
    res.json(
      new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, newCourse),
    );
  } catch (error: any) {
    return res.json(
      new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message),
    );
  }
};

const GetCourse = async (req: Request, res: Response) => {
  const { code, id, page, limit } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    if (id) {
      const courseExist = await CourseService.GetCourseById(id as string);
      if (!courseExist) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, courseExist),
      );
    } else if (code) {
      const courseExist = await CourseService.GetCourseByCode(code as string);
      if (!courseExist) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, courseExist),
      );
    } else if (page && limit) {
      const allCourses = await CourseService.GetAllCourse(p, l);
      if (!allCourses) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, {
          list: allCourses,
          page: p,
          count: allCourses.length,
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
