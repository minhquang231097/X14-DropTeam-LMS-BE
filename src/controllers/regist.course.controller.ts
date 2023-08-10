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

const GetRegist = async (req: Request, res: Response) => {
  const { wp_code, course_code, email, page, limit } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    if (page && limit) {
      const allRegist = await registCourseService.GetAllRegist(p, l);
      if (!allRegist)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, allRegist),
      );
    } else if (page && limit && course_code) {
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
    } else if (page && limit && wp_code) {
      const allRegist = await registCourseService.GetRegistByWorkplaceCode(
        wp_code as string,
        p,
        l,
      );
      if (!allRegist)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, allRegist),
      );
    } else if (page && limit && email) {
      const allRegist = await registCourseService.GetRegistByCourseCode(
        wp_code as string,
        p,
        l,
      );
      if (!allRegist)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, allRegist),
      );
    }
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
  }
};

const UpdateRegist = async (req: Request, res: Response) => {
  const { id } = req.query;
  const { payload } = req.body;
  try {
    const exist = await registCourseService.GetRegistById(id as string);
    if (!exist) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
    }
    await registCourseService.UpdateRegist(id as string, payload);
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
  }
};

const DeleteRegist = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const updatedRegist = await registCourseService.DeleteRegist(id as string);
    if (!updatedRegist)
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
  }
};

export default { RegistedNewCourse, GetRegist, UpdateRegist, DeleteRegist };
