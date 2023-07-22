import { Request, Response } from "express";
import WorkplaceService from "@/services/workplace.service";
import { RESPONSE_CONFIG } from "@/configs/response.config"
import HttpResponseData from "@/common/httpResponseData";
import HttpException from "@/common/httpException";

const CreateWorkplace = async (req: Request, res: Response) => {
    try {
        const workplace: any = await WorkplaceService.CreateWorkplace(req.body)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, workplace))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message))
    }
}

const GetAllWorkplace = async (req: Request, res: Response) => {
    try {
        const allWorkplaces = await WorkplaceService.GetAllWorkplace()
        return res.json(allWorkplaces)
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
    }
}

const GetWorkplaceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const workplaceExist = await WorkplaceService.FindWorkplaceById(id)
        if (!workplaceExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
        }
        return res.json(workplaceExist)
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
    }
}

const UpdateWorkplace = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const update = req.body
        const workplaceExist = await WorkplaceService.FindWorkplaceById(id)
        if (!workplaceExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
        }
        const updateWorkplace = await WorkplaceService.UpdateWorkplace(id, update)
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
        throw new HttpException(RESPONSE_CONFIG.MESSAGE[401], 401, error.message)
    }
}



export default { CreateWorkplace, GetAllWorkplace, UpdateWorkplace, DeletedWorkplace, GetWorkplaceById }