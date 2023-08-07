import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import classService from "@/services/class.service";
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
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
    }
};

const GetAllClass = async (req: Request, res: Response) => {
    const { page, limit } = req.query;
    const p = Number(page);
    const l = Number(limit);
    try {
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
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
    }
};

const GetClassById = async (req: Request, res: Response) => {
    const { id } = req.query;
    try {
        const classExist = await classService.GetClassById(id as string);
        if (!classExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
        }
        return res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, classExist),);
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 404));
    }
};

const GetClassByCode = async (req: Request, res: Response) => {
    const { code } = req.query;
    try {
        const classExist = await classService.GetClassByCode(code as string);
        if (!classExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
        }
        return res.json(
            new HttpResponseData(RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, classExist),
        );
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 404));
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

const DeleteManyClass = async (req: Request, res: Response) => {
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
    GetClassById,
    GetAllClass,
    UpdateClass,
    DeleteOneClass,
    DeleteManyClass,
    GetClassByCode,
};
