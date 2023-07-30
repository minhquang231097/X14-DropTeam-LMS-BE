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
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, "nameabc"))
        }
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, workplace))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message))
    }
}

const GetAllWorkplace = async (req: Request, res: Response) => {
    const { page } = req.query
    const p = Number(page)
    try {
        const allWorkplaces = await WorkplaceService.GetAllWorkplace(p)
        return res.json(allWorkplaces)
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
    }
}

const GetWorkplaceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const workplaceExist = await WorkplaceService.FindWorkplaceById(id)
        if (!workplaceExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
        }
        return res.json(workplaceExist)
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
    }
}

const UpdateWorkplace = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const update: WorkplaceBody = req.body
        const workplaceExist = await WorkplaceService.FindWorkplaceById(id)
        if (!workplaceExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
        }
        await WorkplaceService.UpdateWorkplace(id, update)
        const updateWorkplace = await WorkplaceService.FindWorkplaceById(id)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, updateWorkplace))
    } catch (error: any) {
        throw new HttpException(RESPONSE_CONFIG.MESSAGE[401], 401, error.message)
    }
}

const DeletedWorkplace = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const workplaceExist = await WorkplaceService.FindWorkplaceById(id)
        if (!workplaceExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
        }
        const deleteWorkplace = await WorkplaceService.DeletedWorkplace(id)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, deleteWorkplace))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message))
    }
}



export default { CreateWorkplace, GetAllWorkplace, UpdateWorkplace, DeletedWorkplace, GetWorkplaceById }