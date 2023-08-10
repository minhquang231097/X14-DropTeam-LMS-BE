import { Request, Response } from "express";
import WorkplaceService from "@/services/workplace.service";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import HttpResponseData from "@/common/httpResponseData";
import HttpException from "@/common/httpException";

const CreateWorkplace = async (req: Request, res: Response) => {
  try {
    const workplace: any = await WorkplaceService.CreateWorkplace(req.body);
    res.json(
      new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, workplace),
    );
  } catch (error: any) {
    return res.json(
      new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message),
    );
  }
};

const GetWorkplace = async (req: Request, res: Response) => {
  const { page, limit, id, code } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    if (id) {
      const wp = await WorkplaceService.GetWorkplaceById(id as string);
      if (!wp)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      return res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, wp),
      );
    } else if (code) {
      const wp = await WorkplaceService.GetWorkplaceByCode(code as string);
      if (!wp)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      return res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, wp)
      );
    }else if (page && limit) {
      const all = await WorkplaceService.GetAllWorkplace(p, l);
      if (!all)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
      return res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, all)
      );
    }
    return res.json(
      new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400),
    );
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
  }
};

const UpdateWorkplace = async (req: Request, res: Response) => {
  const { id } = req.query;
  const update = req.body;
  try {
    const workplaceExist = await WorkplaceService.GetWorkplaceById(
      id as string,
    );
    if (!workplaceExist) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
    }
    const updateWorkplace = await WorkplaceService.UpdateWorkplace(
      id as string,
      update,
    );
    res.json(
      new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, updateWorkplace),
    );
  } catch (error: any) {
    return res.json(
      new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message),
    );
  }
};

const DeletedWorkplace = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const workplaceExist = await WorkplaceService.GetWorkplaceById(
      id as string,
    );
    if (!workplaceExist) {
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
    }
    const deleteWorkplace = await WorkplaceService.DeletedWorkplace(
      id as string,
    );
    res.json(
      new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, deleteWorkplace),
    );
  } catch (error: any) {
    return res.json(
      new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message),
    );
  }
};

export default {
  CreateWorkplace,
  GetWorkplace,
  UpdateWorkplace,
  DeletedWorkplace,
};
