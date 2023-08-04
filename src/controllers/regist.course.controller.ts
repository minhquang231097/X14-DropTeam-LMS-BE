import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import registCourseService from "@/services/regist.course.service";
import { Request, Response } from "express";

const RegistedNewCourse = async (req: Request, res: Response) => {
  const { _id } = req.user;
  const { course_code, note } = req.body;
  try {
    const newRegist = await registCourseService.CreateRegistCourse(
      course_code,
      _id,
      note,
    );
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], newRegist));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
  }
};

const GetAllRegist = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    const allRegist = await registCourseService.GetAllRegist(p, l);
    if (!allRegist)
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
    res.json(
      new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, allRegist),
    );
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
  }
};

const GetRegistByCourse = async (req: Request, res: Response) => {
  const { course_code, page, limit } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    const allRegist = await registCourseService.GetRegistByCourseCode(
      course_code as string,
      p,
      l,
    );
    if (!allRegist)
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
    res.json(
      new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, allRegist),
    );
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
  }
};

export default { RegistedNewCourse, GetAllRegist, GetRegistByCourse };
