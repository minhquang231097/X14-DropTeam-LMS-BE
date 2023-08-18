import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import registCourseService from "@/services/regist.course.service";
import { Request, Response } from "express";

const RegistedNewCourse = async (req: Request, res: Response) => {
  const { _id } = req.user;
  const { course_code, note } = req.body;
  try {
    const newRegist = await registCourseService.CreateRegistCourse(course_code, _id, note);
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.REGIST.CREATE_SUCCES, 200, newRegist));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.WRONG, 400));
  }
};

const GetRegist = async (req: Request, res: Response) => {
  const { wp, course, email, page, limit } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    const countDoc = await registCourseService.GetTotalRegist();
    if (course) {
      const num = await registCourseService.GetRegistByCourseCode(course as string);
      const result = await registCourseService.GetRegistByCourseCode(course as string, p, l);
      if (result.length === 0) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.NOT_FOUND, 404));
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 200, {
          list: result,
          count: result.length,
          page: p,
          total: countDoc,
          total_page: Math.ceil(num.length / l),
        }),
      );
    } else if (wp) {
      const num = await registCourseService.GetRegistByWorkplaceCode(wp as string);
      const result = await registCourseService.GetRegistByWorkplaceCode(wp as string, p, l);
      if (result.length === 0) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.NOT_FOUND, 404));
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 200, {
          list: result,
          count: result.length,
          page: p,
          total: countDoc,
          total_page: Math.ceil(num.length / l),
        }),
      );
    } else if (email) {
      const num = await registCourseService.GetRegistByEmailStudent(email as string);
      const result = await registCourseService.GetRegistByEmailStudent(email as string, p, l);
      if (result.length === 0) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.NOT_FOUND, 404));
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 200, {
          list: result,
          count: result.length,
          page: p,
          total: countDoc,
          total_page: Math.ceil(num.length / l),
        }),
      );
    } else if (page && limit) {
      const result = await registCourseService.GetAllRegist(p, l);
      if (result.length === 0) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.NOT_FOUND, 404));
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 200, {
          list: result,
          count: result.length,
          page: p,
          total: countDoc,
          total_page: Math.ceil(countDoc / l),
        }),
      );
    } else {
      const result = await registCourseService.GetAllRegist(1, 10);
      if (result.length === 0) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.NOT_FOUND, 404));
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 200, {
          list: result,
          count: result.length,
          page: 1,
          total: countDoc,
        }),
      );
    }
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.WRONG, 404));
  }
};

const UpdateRegist = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { payload } = req.body;
  try {
    const exist = await registCourseService.GetRegistById(id as string);
    if (!exist) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.NOT_FOUND, 404));
    }
    await registCourseService.UpdateRegist(id as string, payload);
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 200));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.WRONG, 400));
  }
};

const DeleteRegist = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedRegist = await registCourseService.DeleteRegist(id as string);
    if (!updatedRegist) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 404));
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.REGIST.DELETE_SUCCESS, 200));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.WRONG, 400));
  }
};

export default { RegistedNewCourse, GetRegist, UpdateRegist, DeleteRegist };
