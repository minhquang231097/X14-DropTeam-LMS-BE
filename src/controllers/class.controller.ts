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
  const { page, limit, id, email, search, course_code } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    const total = await classService.GetTotalClass();
    if (id) {
      const classExist = await classService.GetClassById(id as string);
      if (!classExist) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      }
      return res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, classExist),
      );
    } else if (course_code) {
      const _class = await classService.GetClassByCourseCode(
        course_code as string,
        p,
        l,
      );
      if (!_class) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, {
          _class,
          page: p,
          total,
        }),
      );
    } else if (search) {
      const classExist = await classService.SearchClassByCondition(
        p,
        l,
        search as string,
      );
      if (!classExist) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, {
          classExist,
          page: p,
          total,
        }),
      );
    } else if (email) {
      const classExist = await classStudentService.GetClassByStudentEmail(
        p,
        l,
        email as string,
      );
      if (!classExist) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, {
          classExist,
          page: p,
          total,
        }),
      );
    } else if (page && limit) {
      const allClasses = await classService.GetAllClass(p, l);
      if (!allClasses) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, {
          allClasses,
          page: p,
          total,
        }),
      );
    } else {
      const allClasses = await classService.GetAllClass(1, 10);
      if (!allClasses) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, {
          allClasses,
          page: p,
          total,
        }),
      );
    }
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
  }
};

const UpdateClass = async (req: Request, res: Response) => {
  const { id } = req.params;
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
  const { id } = req.params;
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
  UpdateClass,
  DeleteOneClass,
  DeleteManyCourse,
  AddStudentToClass,
};
