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
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
        }
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, workplace))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 400, error.message))
    }
}

const GetAllWorkplace = async (req: Request, res: Response) => {
    const { page } = req.query
    const p = Number(page)
    try {
        const allWorkplaces = await WorkplaceService.GetAllWorkplace(p)
        if (!allWorkplaces) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
        }
        return res.json(allWorkplaces)
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
    }
}

const GetWorkplaceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.query
        const _id = String(id)
        const workplaceExist = await WorkplaceService.GetWorkplaceById(_id)
        if (!workplaceExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404, "Workplace Not Exist"))
        }
        return res.json(workplaceExist)
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
    }
}

const UpdateWorkplace = async (req: Request, res: Response) => {
    try {
        const { id } = req.query
        const _id = String(id)
        const update = req.body
        const workplaceExist = await WorkplaceService.GetWorkplaceById(_id)
        if (!workplaceExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, "Workplace Not Exist"))
        }
        await WorkplaceService.UpdateWorkplace(_id, update)
        const updateWorkplace = await WorkplaceService.GetWorkplaceById(_id)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, updateWorkplace))
    } catch (error: any) {
        throw new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message)
    }
}

const DeletedWorkplace = async (req: Request, res: Response) => {
    const { id } = req.query
    const _id = String(id)
    try {
        const workplaceExist = await WorkplaceService.GetWorkplaceById(_id)
        if (!workplaceExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, "Workplace Not Exist"))
        }
        const deleteWorkplace = await WorkplaceService.DeletedWorkplace(_id)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, deleteWorkplace))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message))
    }
}



export default { CreateWorkplace, GetAllWorkplace, UpdateWorkplace, DeletedWorkplace, GetWorkplaceById }