import { Request, Response } from "express";
import WorkplaceService from "@/services/workplace.service";
import { RESPONSE_CONFIG } from "@/configs/response.config"
import HttpResponseData from "@/common/httpResponseData";
import HttpException from "@/common/httpException";
import { WorkplaceBody } from "@/types/workplace/workplace";

const CreateWorkplace = async (req: Request, res: Response) => {
    try {
        const workplace: any = await WorkplaceService.CreateWorkplace(req.body)
        if (!workplace) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 404))
        }
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.CREATE_SUCCES, 200, workplace))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.WORKPLACE_EXIST, 400, error.message))
    }
}

const GetAllWorkplace = async (req: Request, res: Response) => {
    const { page, limit } = req.query
    const p = Number(page)
    const l = Number(limit)
    try {
        const allWorkplaces = await WorkplaceService.GetAllWorkplace(p, l)
        if (!allWorkplaces) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404))
        }
        return res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, { list: allWorkplaces, page: p, count: allWorkplaces.length }))
    }
    catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 404))
    }
}

const GetWorkplaceById = async (req: Request, res: Response) => {
    const { id } = req.query
    const _id = String(id)
    try {
        const workplaceExist = await WorkplaceService.GetWorkplaceById(_id)
        if (!workplaceExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404))
        }
        return res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, workplaceExist))
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 404))
    }
}

const UpdateWorkplace = async (req: Request, res: Response) => {
    const { id } = req.query
    const _id = String(id)
    try {
        const update = req.body
        const workplaceExist = await WorkplaceService.GetWorkplaceById(_id)
        if (!workplaceExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 400))
        }
        await WorkplaceService.UpdateWorkplace(_id, update)
        const updateWorkplace = await WorkplaceService.GetWorkplaceById(_id)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.UPDATE_SUCCESS, 200, updateWorkplace))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 400, error.message))
    }
}

const DeletedWorkplace = async (req: Request, res: Response) => {
    const { id } = req.query
    const _id = String(id)
    try {
        const workplaceExist = await WorkplaceService.GetWorkplaceById(_id)
        if (!workplaceExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 400))
        }
        await WorkplaceService.DeletedWorkplace(_id)
        const deleteWorkplace = await WorkplaceService.GetWorkplaceById(_id)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.WORKPLACE.DELETE_SUCCESS, 200, deleteWorkplace))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 400, error.message))
    }
}



export default { CreateWorkplace, GetAllWorkplace, UpdateWorkplace, DeletedWorkplace, GetWorkplaceById }