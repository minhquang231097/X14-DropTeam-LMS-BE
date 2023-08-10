import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import attendanceService from "@/services/attendance.service";
import classService from "@/services/class.service";
import { Request, Response } from "express";

const CreateNewAttendance = async (req: Request, res: Response) => {
  const payload = req.body;
  try {
    const newAttendance = await attendanceService.CreateAttendance(
      payload.session_code,
      payload.class_code,
      payload,
    );
    res.json(
      new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, newAttendance),
    );
  } catch (error) {
    return res.json(
      res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400)),
    );
  }
};

const GetAttendance = async (req: Request, res: Response) => {
  const { page, limit, class_code, day } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    if (page && limit && class_code) {
      const result = await attendanceService.GetAttendanceByClassCode(
        class_code as string,
        p,
        l,
      );
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, result),
      );
    } else if (page && limit && day) {
      const result = await classService.GetClassByCode(day as string);
      if (!result) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      }
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, result),
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
    }
    return res.json(
      new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400),
    );
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
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

export default {};
