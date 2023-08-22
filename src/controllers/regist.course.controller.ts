import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import courseService from "@/services/course.service";
import registCourseService from "@/services/regist.course.service";
import userService from "@/services/user.service";
import workplaceService from "@/services/workplace.service";
import { Request, Response } from "express";

const RegistedNewCourseInStudent = async (req: Request, res: Response) => {
  const { course_id, workplace_id } = req.body;
  const payload = req.body;
  const { _id } = req.user;
  try {
    const [_course, _workplace, _student] = await Promise.all([
      courseService.GetCourseById(course_id),
      workplaceService.GetWorkplaceById(workplace_id),
      userService.GetUserById(_id),
    ]);
    if (!_course || !_workplace || !_student) return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.INVALID, 404));
    const found = await registCourseService.GetRegistByCourseIdAndStudentId(course_id as string, _id as string);
    if (found) return res.status(403).send(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.CAN_NOT_REGIST, 403));
    const newRegist = await registCourseService.CreateRegistCourse(payload);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.REGIST.CREATE_SUCCES, 200, newRegist));
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.WRONG, 400));
  }
};

const RegistedNewCourseInAdmin = async (req: Request, res: Response) => {
  const { course_id, workplace_id, student_id } = req.body;
  const payload = req.body;
  try {
    const [_course, _workplace, _student] = await Promise.all([
      courseService.GetCourseById(course_id),
      workplaceService.GetWorkplaceById(workplace_id),
      userService.GetUserById(student_id),
    ]);
    if (!_course || !_workplace || !_student) return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.INVALID, 404));
    const found = await registCourseService.GetRegistByCourseIdAndStudentId(course_id as string, student_id as string);
    if (found) return res.status(403).send(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.CAN_NOT_REGIST, 403));
    const newRegist = await registCourseService.CreateRegistCourse(payload);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.REGIST.CREATE_SUCCES, 200, newRegist));
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.WRONG, 400));
  }
};

const GetRegist = async (req: Request, res: Response) => {
  const { workplace_id, course_id, email, page, limit } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    const countDoc = await registCourseService.GetTotalRegist();
    if (course_id) {
      const num = await registCourseService.GetRegistByCourseId(course_id as string);
      const result = await registCourseService.GetRegistByCourseId(course_id as string, p, l);
      if (result.length === 0) return res.status(200).send(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_NO_DATA, 200));
      res
        .status(200)
        .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
    } else if (workplace_id) {
      const num = await registCourseService.GetRegistByWorkplaceId(workplace_id as string);
      const result = await registCourseService.GetRegistByWorkplaceId(workplace_id as string, p, l);
      if (result.length === 0) return res.status(200).send(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_NO_DATA, 200));
      res
        .status(200)
        .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
    } else if (email) {
      const num = await registCourseService.GetRegistByStudentId(email as string);
      const result = await registCourseService.GetRegistByStudentId(email as string, p, l);
      if (result.length === 0) return res.status(200).send(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_NO_DATA, 200));
      res
        .status(200)
        .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
    } else if (page && limit) {
      const result = await registCourseService.GetAllRegist(p, l);
      if (result.length === 0) return res.status(200).send(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_NO_DATA, 200));
      res
        .status(200)
        .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 200, result, result.length, countDoc, p, Math.ceil(countDoc / l)));
    } else {
      const result = await registCourseService.GetAllRegist(1, 10);
      if (result.length === 0) return res.status(200).send(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_NO_DATA, 200));
      res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 200, result, result.length, countDoc, 1, Math.ceil(countDoc / 10)));
    }
  } catch (error) {
    return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.WRONG, 404));
  }
};

const GetRegistInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exist = await registCourseService.GetRegistById(id as string);
    if (!exist) {
      return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.NOT_FOUND, 404));
    }
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 200, exist));
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.WRONG, 400));
  }
};

const UpdateRegist = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { payload } = req.body;
  try {
    const exist = await registCourseService.GetRegistById(id as string);
    if (!exist) {
      return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.NOT_FOUND, 404));
    }
    await registCourseService.UpdateRegist(id as string, payload);
    const newRegist = await registCourseService.GetRegistById(id as string);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 200, newRegist));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.WRONG, 400));
  }
};

const DeleteRegist = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exist = await registCourseService.GetRegistById(id as string);
    if (!exist) {
      return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.NOT_FOUND, 404));
    }
    await registCourseService.DeleteRegist(id as string);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.REGIST.DELETE_SUCCESS, 200));
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.REGIST.WRONG, 400));
  }
};

export default { RegistedNewCourseInStudent, GetRegist, UpdateRegist, DeleteRegist, GetRegistInfo, RegistedNewCourseInAdmin };
