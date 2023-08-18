import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import classService from "@/services/class.service";
import classStudentService from "@/services/class.student.service";
import { Request, Response } from "express";

const CreateNewClass = async (req: Request, res: Response) => {
  const { mentor, workplace, course, class_code } = req.body;
  const payload = req.body;
  try {
    const exist = await classService.GetClassByCode(class_code);
    if (exist) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.CLASS_EXIST, 403));
    const newClass = await classService.CreateOneClass(mentor, workplace, course, payload);
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.CREATE_SUCCES, 200, newClass));
  } catch (error) {
    return res.json(res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400)));
  }
};

const AddStudentToClass = async (req: Request, res: Response) => {
  const { email, class_code } = req.body;
  try {
    const result = await classStudentService.AddStudentToClass(email, class_code);
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.ADD_STU_SUCCESS, 200));
  } catch (error) {
    return res.json(res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400)));
  }
};

const GetClass = async (req: Request, res: Response) => {
  const { page, limit, id, email, search, course } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    const countDoc = await classService.GetTotalClass();
    if (id) {
      const result = await classService.GetClassById(id as string);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
      }
      return res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, result));
    } else if (course) {
      const num = await classService.GetClassByCourseCode(course as string);
      const result = await classService.GetClassByCourseCode(course as string, p, l);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, {
          list: result,
          page: p,
          total: countDoc,
          count: result.length,
          total_page: Math.ceil(num.length / l),
        }),
      );
    } else if (search) {
      const num = await classService.SearchClassByCondition(search as string);
      const result = await classService.SearchClassByCondition(search as string, p, l);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, {
          list: result,
          page: p,
          count: result.length,
          total: countDoc,
          total_page: Math.ceil(num.length / l),
        }),
      );
    } else if (email) {
      const num = await classStudentService.GetClassByStudentEmail(email as string);
      const result = await classStudentService.GetClassByStudentEmail(email as string, p, l);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, {
          list: result,
          page: p,
          count: result.length,
          total: countDoc,
          total_page: Math.ceil(num.length / l),
        }),
      );
    } else if (page && limit) {
      const result = await classService.GetAllClass(p, l);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, {
          list: result,
          page: p,
          count: result.length,
          total: countDoc,
          total_page: Math.ceil(countDoc / l),
        }),
      );
    } else {
      const result = await classService.GetAllClass(1, 10);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, {
          list: result,
          page: 1,
          total: countDoc,
        }),
      );
    }
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 404));
  }
};

const UpdateClass = async (req: Request, res: Response) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const classUpdated = await classService.UpdateOneClass(id as string, update);
    if (!classUpdated) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
    }
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.UPDATE_SUCCESS, 200, classUpdated));
  } catch (error: any) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400));
  }
};

const DeleteOneClass = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const classDeleted = await classService.DeleteClassById(id as string);
    if (!classDeleted) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
    }
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.DELETE_SUCCESS, 200));
  } catch (error: any) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400, error.message));
  }
};

const DeleteManyCourse = async (req: Request, res: Response) => {
  const filter = req.body;
  try {
    const classDeleted = await classService.DeleteClassByCondition(filter);
    if (!classDeleted) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
    }
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.DELETE_SUCCESS, 200));
  } catch (error: any) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400, error.message));
  }
};

export default {
  CreateNewClass,
  GetClass,
  UpdateClass,
  DeleteOneClass,
  DeleteManyCourse,
  AddStudentToClass,
};
