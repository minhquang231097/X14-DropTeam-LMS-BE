import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import classService from "@/services/class.service";
import classStudentService from "@/services/class.student.service";
import courseService from "@/services/course.service";
import userService from "@/services/user.service";
import workplaceService from "@/services/workplace.service";
import { Request, Response } from "express";

const CreateNewClass = async (req: Request, res: Response) => {
  const { class_code, course_id, workplace_id, mentor_id } = req.body;
  const payload = req.body;
  try {
    const [_course, _workplace, _mentor, _class] = await Promise.all([
      courseService.GetCourseById(course_id),
      workplaceService.GetWorkplaceById(workplace_id),
      userService.GetUserById(mentor_id),
      classService.GetClassByCode(class_code),
    ]);
    if (!_course || !_workplace || !_mentor || _class) return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_EXIST, 404));
    const newClass = await classService.CreateOneClass(payload);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.CREATE_SUCCES, 200, newClass));
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400));
  }
};

const AddStudentToClass = async (req: Request, res: Response) => {
  const { list } = req.body;
  try {
    if (list.length === 0) return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.CLASS_EXIST, 400));
    const result = await classStudentService.AddStudentToClass(list);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.ADD_STU_SUCCESS, 200, result));
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400));
  }
};

const GetClass = async (req: Request, res: Response) => {
  const { page, limit, student_id, search, course_id, status } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    const countDoc = await classService.GetTotalClass();
    if (course_id) {
      const num = await classService.GetClassByCourseId(course_id as string);
      const result = await classService.GetClassByCourseId(course_id as string, p, l);
      if (result.length === 0) {
        return res.status(404).json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
      }
      res
        .status(200)
        .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
    } else if (status) {
      const num = await classService.GetClassByStatus(status as string);
      const result = await classService.GetClassByStatus(status as string, p, l);
      if (result.length === 0) {
        return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
      }
      res
        .status(200)
        .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
    } else if (search) {
      const num = await classService.SearchClassByCondition(search as string);
      const result = await classService.SearchClassByCondition(search as string, p, l);
      if (result.length === 0) {
        return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
      }
      res
        .status(200)
        .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, result, result.length, countDoc, p, Math.ceil(num.length / l)));
    } else if (student_id) {
      const num = await classStudentService.GetClassByStudentId(student_id as string);
      const result = await classStudentService.GetClassByStudentId(student_id as string, p, l);
      if (result.length === 0) {
        return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
      }
      res
        .status(200)
        .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
    } else if (page && limit) {
      const result = await classService.GetAllClass(p, l);
      if (result.length === 0) {
        return res.status(404).json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
      }
      res
        .status(200)
        .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, result, result.length, countDoc, p, Math.ceil(countDoc / l)));
    } else {
      const result = await classService.GetAllClass(1, 10);
      if (result.length === 0) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
      }
      res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, result));
    }
  } catch (error) {
    res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 404));
  }
};

const GetClassInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await classService.GetClassById(id as string);
    if (!result) {
      return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
    }
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, result));
  } catch (error) {
    return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 404));
  }
};

const UpdateClass = async (req: Request, res: Response) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const classUpdated = await classService.UpdateOneClass(id as string, update);
    if (!classUpdated) {
      return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
    }
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.UPDATE_SUCCESS, 200));
  } catch (error: any) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400));
  }
};

const UpdateStatusStudentInClass = async (req: Request, res: Response) => {
  const payload = req.body;
  const { student_id, class_id } = payload;
  try {
    const [_student, _class] = await Promise.all([userService.GetUserById(student_id), classService.GetClassById(class_id)]);
    if (!_student || !_class) return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 404));
    const result = await classStudentService.UpdateStatusStudentInClass(payload);
    if (!result) {
      return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 404));
    }
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.UPDATE_SUCCESS, 200));
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400));
  }
};

const DeleteOneClass = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const classDeleted = await classService.DeleteClassById(id as string);
    if (!classDeleted) {
      return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
    }
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.DELETE_SUCCESS, 200));
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
