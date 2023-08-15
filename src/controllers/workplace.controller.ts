import { Request, Response } from "express";
import WorkplaceService from "@/services/workplace.service";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import HttpResponseData from "@/common/httpResponseData";
import HttpException from "@/common/httpException";

const CreateWorkplace = async (req: Request, res: Response) => {
  try {
    const workplace: any = await WorkplaceService.CreateWorkplace(req.body);
    res.json(
      new HttpResponseData(
        RESPONSE_CONFIG.MESSAGE.WORKPLACE.CREATE_SUCCES,
        200,
        workplace,
      ),
    );
  } catch (error: any) {
    return res.json(
      new HttpException(
        RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG,
        400,
        error.message,
      ),
    );
  }
};

const GetWorkplace = async (req: Request, res: Response) => {
  const { page, limit, id, code, search } = req.query;
  const p = Number(page);
  const l = Number(limit);
  const total = await WorkplaceService.GetTotalWorkplace();
  try {
    if (id) {
      const wp = await WorkplaceService.GetWorkplaceById(id as string);
      if (!wp)
        return res.json(
          new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404),
        );
      return res.json(
        new HttpResponseData(
          RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS,
          200,
          wp,
        ),
      );
    } else if (code) {
      const wp = await WorkplaceService.GetWorkplaceByCode(code as string);
      if (!wp)
        return res.json(
          new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404),
        );
      return res.json(
        new HttpResponseData(
          RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS,
          200,
          wp,
        ),
      );
    } else if (search) {
      const all = await WorkplaceService.SearchWorkplaceByCondition(
        1,
        10,
        search as string,
      );
      if (!all)
        return res.json(
          new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404),
        );
      return res.json(
        new HttpResponseData(
          RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS,
          200,
          all,
        ),
      );
    } else if (page && limit) {
      const all = await WorkplaceService.GetAllWorkplace(p, l);
      if (!all)
        return res.json(
          new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404),
        );
      return res.json(
        new HttpResponseData(
          RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS,
          200,
          { all, page: 1, limit: 10, total },
        ),
      );
    } else {
      const all = await WorkplaceService.GetAllWorkplace(1, 10);
      if (!all)
        return res.json(
          new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404),
        );
      return res.json(
        new HttpResponseData(
          RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS,
          200,
          { all, page: 1, limit: 10, total },
        ),
      );
    }
  } catch (error) {
    return res.json(
      new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 404),
    );
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
      return res.json(
        new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 400),
      );
    }
    const updateWorkplace = await WorkplaceService.UpdateWorkplace(
      id as string,
      update,
    );
    res.json(
      new HttpResponseData(
        RESPONSE_CONFIG.MESSAGE.WORKPLACE.UPDATE_SUCCESS,
        200,
        updateWorkplace,
      ),
    );
  } catch (error: any) {
    return res.json(
      new HttpException(
        RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG,
        400,
        error.message,
      ),
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
      return res.json(
        new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 400),
      );
    }
    const deleteWorkplace = await WorkplaceService.DeletedWorkplace(
      id as string,
    );
    res.json(
      new HttpResponseData(
        RESPONSE_CONFIG.MESSAGE.WORKPLACE.DELETE_SUCCESS,
        200,
        deleteWorkplace,
      ),
    );
  } catch (error: any) {
    return res.json(
      new HttpException(
        RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG,
        400,
        error.message,
      ),
    );
  }
};

export default {
  CreateWorkplace,
  GetWorkplace,
  UpdateWorkplace,
  DeletedWorkplace,
};
