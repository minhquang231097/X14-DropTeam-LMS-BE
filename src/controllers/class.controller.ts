import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import classService from "@/services/class.service";
import classStudentService from "@/services/class.student.service";
import courseService from "@/services/course.service";
import registCourseService from "@/services/regist.course.service";
import userService from "@/services/user.service";
import workplaceService from "@/services/workplace.service";
import { Request, Response } from "express";
import mongoose from "mongoose";

const LIMIT_PAGE_CLASS = 10;

const CreateNewClass = async (req: Request, res: Response) => {
  const { course_id, workplace_id, mentor_id } = req.body;
  const payload = req.body;
  try {
    const [_course, _workplace, _mentor] = await Promise.all([
      courseService.GetCourseById(course_id),
      workplaceService.GetWorkplaceById(workplace_id),
      userService.GetUserById(mentor_id),
    ]);
    if (!_course || !_workplace || !_mentor) return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_EXIST, 404));
    const newClass = await classService.CreateOneClass(payload);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.CREATE_SUCCES, 200, newClass));
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400));
  }
};

const AddStudentToClass = async (req: Request, res: Response) => {
  const { list, class_id } = req.body;
  try {
    const check = await classStudentService.CheckStudentLengthAndInRegistCourse(list);
    if (list.length === 0) {
      return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 400));
    } else if (check.length == 0) {
      return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NO_STUDENT_IN_REGIST, 404));
    } else {
      const result = await classStudentService.AddStudentToClass(list, class_id);
      await registCourseService.DeleteRegistAfterAdd(list);
      res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.ADD_STU_SUCCESS, 200, result));
    }
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400));
  }
};

const GetClass = async (req: Request, res: Response) => {
  const { page, limit, student_id, search, course_id, status, mentor_id } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    if ((!student_id || mongoose.isValidObjectId(student_id)) && (!course_id || mongoose.isValidObjectId(course_id))) {
      const countDoc = await classService.GetTotalClass();
      if (course_id) {
        const num = await classService.GetClassByCourseId(course_id as string);
        let result;
        if (p === undefined && l === undefined) {
          result = await classService.GetClassByCourseId(course_id as string, 1, LIMIT_PAGE_CLASS);
        } else {
          result = await classService.GetClassByCourseId(course_id as string, p, l);
        }
        if (result.length === 0) return res.status(404).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
        res
          .status(200)
          .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
      } else if (status) {
        const num = await classService.GetClassByStatus(status as string);
        let result;
        if (p === undefined && l === undefined) {
          result = await classService.GetClassByStatus(status as string, 1, LIMIT_PAGE_CLASS);
        } else {
          result = await classService.GetClassByStatus(status as string, p, l);
        }
        if (result.length === 0) return res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_NO_DATA, 200));
        res
          .status(200)
          .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
      } else if (search) {
        const num = await classService.SearchClassByCondition(search as string);
        let result;
        if (p === undefined && l === undefined) {
          result = await classService.SearchClassByCondition(search as string, 1, 10);
        } else {
          result = await classService.SearchClassByCondition(search as string, p, l);
        }
        if (result.length === 0) return res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_NO_DATA, 200));
        res
          .status(200)
          .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
      } else if (student_id) {
        const num = await classStudentService.GetClassByStudentId(student_id as string);
        let result;
        if (p === undefined && l === undefined) {
          result = await classStudentService.GetClassByStudentId(student_id as string, 1, 10);
        } else {
          result = await classStudentService.GetClassByStudentId(student_id as string, p, l);
        }
        if (result.length === 0) return res.status(404).json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
        res
          .status(200)
          .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
      } else if (mentor_id) {
        const num = await classService.GetClassByMentorId(mentor_id as string);
        let result;
        if (p === undefined && l === undefined) {
          result = await classService.GetClassByMentorId(mentor_id as string, 1, 10);
        } else {
          result = await classService.GetClassByMentorId(mentor_id as string, p, l);
        }
        if (result.length === 0) return res.status(404).json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
        res
          .status(200)
          .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
      } else if (page && limit) {
        const result = await classService.GetAllClass(p, l);
        if (result.length === 0) {
          return res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_NO_DATA, 200));
        }
        res
          .status(200)
          .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, result, result.length, countDoc, p, Math.ceil(countDoc / l)));
      } else {
        const result = await classService.GetAllClass(1, LIMIT_PAGE_CLASS);
        if (result.length === 0) return res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_NO_DATA, 200));
        res
          .status(200)
          .json(
            new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, result, result.length, countDoc, 1, Math.ceil(countDoc / LIMIT_PAGE_CLASS)),
          );
      }
    } else {
      return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
    }
  } catch (error: Error | any) {
    res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400, error.message));
  }
};

const GetClassInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exist = await classService.GetClassById(id as string);
    if (!exist) return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, exist));
  } catch (error) {
    return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 404));
  }
};

const UpdateClass = async (req: Request, res: Response) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const exist = await classService.GetClassById(id as string);
    if (exist) {
      await classService.UpdateOneClass(id as string, update);
      const newClass = await classService.GetClassById(id as string);
      return res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.UPDATE_SUCCESS, 200, newClass));
    }
    return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
  } catch (error: any) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400));
  }
};

const UpdateStatusStudentInClass = async (req: Request, res: Response) => {
  const payload = req.body;
  const { student_id, class_id } = payload;
  try {
    const exist = await classStudentService.CheckStudentExistInClass(student_id, class_id);
    if (exist) {
      await classStudentService.UpdateStatusStudentInClass(payload);
      const newUpdate = await classStudentService.GetStudentInClassByStudentId(student_id);
      return res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.UPDATE_SUCCESS, 200, newUpdate));
    }
    return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400));
  }
};

const DeleteOneClass = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exist = await classService.GetClassById(id as string);
    if (exist) {
      await classService.DeleteClassById(id as string);
      res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.DELETE_SUCCESS, 200));
    }
    return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
  } catch (error: any) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400));
  }
};

export default {
  CreateNewClass,
  GetClass,
  UpdateClass,
  DeleteOneClass,
  AddStudentToClass,
  GetClassInfo,
  UpdateStatusStudentInClass,
};
