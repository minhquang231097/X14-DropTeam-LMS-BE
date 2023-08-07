import { Request, Response } from "express";
import WorkplaceService from "@/services/workplace.service";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import HttpResponseData from "@/common/httpResponseData";
import HttpException from "@/common/httpException";

const CreateWorkplace = async (req: Request, res: Response) => {
    try {
        const workplace: any = await WorkplaceService.CreateWorkplace(req.body);
        res.json(
            new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.CREATE_SUCCES, 200, workplace),
        );
    } catch (error: any) {
        return res.json(
            new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 400, error.message),
        );
    }
};

const GetAllWorkplace = async (req: Request, res: Response) => {
    try {
        const allWorkplaces = await WorkplaceService.GetAllWorkplace();
        if (!allWorkplaces) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
        }
        return res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 302, allWorkplaces));
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 404));
    }
};

const GetWorkplaceById = async (req: Request, res: Response) => {
    const { id } = req.query;
    try {
        const workplaceExist = await WorkplaceService.GetWorkplaceById(id as string);
        if (!workplaceExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
        }
        return res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 302, workplaceExist));
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 404));
    }
};

const UpdateWorkplace = async (req: Request, res: Response) => {
    const { id } = req.query;
    const update = req.body;
    try {
        const workplaceExist = await WorkplaceService.GetWorkplaceById(id as string,);
        if (!workplaceExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
        }
        await WorkplaceService.UpdateWorkplace(id as string, update,);
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.UPDATE_SUCCESS, 200));
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 406, error.message));
    }
};

const DeletedWorkplace = async (req: Request, res: Response) => {
    const { id } = req.query;
    try {
        const workplaceExist = await WorkplaceService.GetWorkplaceById(id as string);
        if (!workplaceExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 400));
        }
        const deleteWorkplace = await WorkplaceService.DeletedWorkplace(id as string,);
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.DELETE_SUCCESS, 200, deleteWorkplace));
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 400, error.message));
    }
};

const SearchWorkplace = async (req: Request, res: Response) => {
    const { field, filter, page, limit } = req.query;
    const p = Number(page);
    const l = Number(limit);
    try {
        const result = await WorkplaceService.SearchUserByCondition(p, l, filter, field);
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, { list: result, page: p, count: result.length, }));
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 400));
    }
};

export default { CreateWorkplace, GetAllWorkplace, UpdateWorkplace, DeletedWorkplace, GetWorkplaceById, SearchWorkplace };
