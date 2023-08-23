import { Request, Response } from "express";
import WorkplaceService from "@/services/workplace.service";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import HttpResponseData from "@/common/httpResponseData";
import HttpException from "@/common/httpException";

const LIMIT_PAGE_WORKPLACE = 10

const CreateWorkplace = async (req: Request, res: Response) => {
  const { workplace_code } = req.body;
  try {
    const exist = await WorkplaceService.GetWorkplaceByCode(workplace_code);
    if (exist) return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.CODE_EXIST, 400));
    const workplace: any = await WorkplaceService.CreateWorkplace(req.body);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.CREATE_SUCCES, 200, workplace));
  } catch (error: any) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 400, error.message));
  }
};

const GetWorkplace = async (req: Request, res: Response) => {
  const { page, limit, search, status } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    const countDoc = await WorkplaceService.GetTotalWorkplace();
    if (status) {
      const num = await WorkplaceService.GetWorkplaceByStatus(status as string);
      const result = await WorkplaceService.GetWorkplaceByStatus(status as string, p, l);
      if (result.length === 0) {
        return res.status(200).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_NO_DATA, 200));
      }
      res
        .status(200)
        .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
    } else if (search) {
      const num = await WorkplaceService.SearchWorkplaceByCondition(search as string);
      // const result = await WorkplaceService.SearchWorkplaceByCondition(search as string, p, l);
      let result;
      if (p !== undefined && l !== undefined) {
        result = await WorkplaceService.SearchWorkplaceByCondition(search as string, p, l);
      } else {
        result = await WorkplaceService.SearchWorkplaceByCondition(search as string, 1, 10);
      }
      if (result.length === 0) return res.status(200).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_NO_DATA, 200));
      res
        .status(200)
        .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
    } else if (page && limit) {
      const result = await WorkplaceService.GetAllWorkplace(p, l);
      if (result.length === 0) return res.status(200).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_NO_DATA, 200));
      res
        .status(200)
        .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, result, result.length, countDoc, p, Math.ceil(countDoc / l)));
    } else {
      const result = await WorkplaceService.GetAllWorkplace(1, LIMIT_PAGE_WORKPLACE);
      if (result.length === 0) return res.status(200).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_NO_DATA, 200));
      res
        .status(200)
        .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, result, result.length, countDoc, 1, Math.ceil(countDoc / LIMIT_PAGE_WORKPLACE)));
    }
  } catch (error) {
    return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 404));
  }
};

const GetWorkplaceInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id.length != 24) {
    return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
  }
  try {
    const result = await WorkplaceService.GetWorkplaceById(id as string);
    if (!result) return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, result));
  } catch (error) {
    return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
  }
};

const UpdateWorkplace = async (req: Request, res: Response) => {
  const { id } = req.params;
  const update = req.body;
  if (id.length != 24) {
    return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
  }
  try {
    const exist = await WorkplaceService.GetWorkplaceById(id as string);
    if (!exist) {
      return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
    }
    await WorkplaceService.UpdateWorkplace(id as string, update);
    const newWorkplace = await WorkplaceService.GetWorkplaceById(id as string);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.UPDATE_SUCCESS, 200, newWorkplace));
  } catch (error: any) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 400));
  }
};

const DeletedWorkplace = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id.length != 24) {
    return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
  }
  try {
    const exist = await WorkplaceService.GetWorkplaceById(id as string);
    if (!exist) {
      return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 400));
    }
    await WorkplaceService.DeletedWorkplace(id as string);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.DELETE_SUCCESS, 200));
  } catch (error: any) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 400, error.message));
  }
};

export default {
  CreateWorkplace,
  GetWorkplace,
  UpdateWorkplace,
  DeletedWorkplace,
  GetWorkplaceInfo,
};
