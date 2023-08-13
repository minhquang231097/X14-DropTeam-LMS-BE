import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import classService from "@/services/class.service";
import classStudentService from "@/services/class.student.service";
import { Request, Response } from "express";

const CreateNewClass = async (req: Request, res: Response) => {
  const { mentor, workplace, course } = req.body;
  const payload = req.body;
  try {
    const newClass = await classService.CreateOneClass(
      mentor,
      workplace,
      course,
      payload,
    );
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, newClass));
  } catch (error) {
    return res.json(
      res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400)),
    );
  }
};

const AddStudentToClass = async (req: Request, res: Response) => {
  const { email, class_code } = req.body;
  try {
    const result = await classStudentService.AddStudentToClass(
      email,
      class_code,
    );
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200));
  } catch (error) {
    return res.json(
      res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400)),
    );
  }
};

const GetClass = async (req: Request, res: Response) => {
  const { page, limit, id, code, email } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    if (id) {
      const classExist = await classService.GetClassById(id as string);
      if (!classExist) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      }
      return res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, classExist),
      );
    } else if (code) {
      const classExist = await classService.GetClassByCode(code as string);
      if (!classExist) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, classExist),
      );
    } else if (email && page && limit) {
      const classExist = await classStudentService.GetClassByStudentEmail(
        p,
        l,
        email as string,
      );
      if (!classExist) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, classExist),
      );
    } else if (page && limit) {
      const allClasses = await classService.GetAllClass(p, l);
      if (!allClasses) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, {
          list: allClasses,
          page: p,
          count: allClasses.length,
        }),
      );
    } else {
      const allClasses = await classService.GetAllClass(1, 10);
      if (!allClasses) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, allClasses),
      );
    }
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
  }
};

const SearchClass = async (req: Request, res: Response) => {
  const { q, page, limit } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    const result = await classService.SearchClassByCondition(p, l, q as string);
    if (result.length == 0) {
      return res.json(
        new HttpException(RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404),
      );
    }
    res.json(
      new HttpResponseData(RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, result),
    );
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.USER.WRONG, 404));
  }
};

const UpdateClass = async (req: Request, res: Response) => {
  const { id } = req.query;
  const update = req.body;
  try {
    const classUpdated = await classService.UpdateOneClass(
      id as string,
      update,
    );
    if (!classUpdated) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
    }
    res.json(
      new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, classUpdated),
    );
  } catch (error: any) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
  }
};

const DeleteOneClass = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const classDeleted = await classService.DeleteClassById(id as string);
    if (!classDeleted) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
    }
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200));
  } catch (error: any) {
    return res.json(
      new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message),
    );
  }
};

const DeleteManyCourse = async (req: Request, res: Response) => {
  const filter = req.body;
  try {
    const classDeleted = await classService.DeleteClassByCondition(filter);
    if (!classDeleted) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
    }
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200));
  } catch (error: any) {
    return res.json(
      new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message),
    );
  }
};

export default {
  CreateNewClass,
  GetClass,
  SearchClass,
  UpdateClass,
  DeleteOneClass,
  DeleteManyCourse,
  AddStudentToClass,
};
