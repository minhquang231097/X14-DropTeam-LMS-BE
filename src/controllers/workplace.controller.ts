import { Request, Response } from "express";
import WorkplaceService from "@/services/workplace.service";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import HttpResponseData from "@/common/httpResponseData";
import HttpException from "@/common/httpException";
import workplaceService from "@/services/workplace.service";

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

const GetAllWorkplace = async (req: Request, res: Response) => {
    try {
        const allWorkplaces = await WorkplaceService.GetAllWorkplace();
        if (!allWorkplaces) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
        }
        return res.json(allWorkplaces);
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
    }
};

const GetWorkplaceById = async (req: Request, res: Response) => {
    const { id } = req.query;
    try {
        const workplaceExist = await WorkplaceService.GetWorkplaceById(
            id as string,
        );
        if (!workplaceExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
        }
        return res.json(workplaceExist);
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
    }
};

const UpdateWorkplace = async (req: Request, res: Response) => {
    const { id } = req.query;
    const update = req.body;
    try {
        const workplaceExist = await WorkplaceService.GetWorkplaceById(id as string,);
        if (!workplaceExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
        }
        await WorkplaceService.UpdateWorkplace(id as string, update,);
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200));
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message));
    }
};

const DeletedWorkplace = async (req: Request, res: Response) => {
    const { id } = req.query;
    try {
        const workplaceExist = await WorkplaceService.GetWorkplaceById(id as string);
        if (!workplaceExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
        }
        const deleteWorkplace = await WorkplaceService.DeletedWorkplace(id as string,);
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, deleteWorkplace));
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message));
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
