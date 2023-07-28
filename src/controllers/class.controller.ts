import { Request, Response } from "express";
import ClassService from "@/services/class.service";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import HttpResponseData from "@/common/httpResponseData";
import HttpException from "@/common/httpException";

const CreateClass = async (req: Request, res: Response) => {
    const payload = req.body
    try {
        const newClass: any = await ClassService.CreateOneClass(payload)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, newClass))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message))
    }
}

const GetAllClass = async (req: Request, res: Response) => {
    const { page } = req.params
    const p = Number(page)
    try {
        const allClasss = await ClassService.GetAllClass(p)
        return res.json(allClasss)
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
    }
}

const GetClassById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const classExist = await ClassService.GetClassById(id)
        if (!classExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
        }
        return res.json(classExist)
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
    }
}

const UpdateClass = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const update = req.body
        const classExist = await ClassService.GetClassById(id)
        const classCodeExist = await ClassService.GetClassByCode(update.class_code)
        if (classCodeExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, "Class Code Exist"))
        }
        if (!classExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
        }
        await ClassService.UpdateOneClass(id, update)
        const updateClass = await ClassService.GetClassById(id)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, updateClass))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message))
    }
}

const DeletedClass = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const classExist = await ClassService.GetClassById(id)
        if (!classExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
        }
        const deleteClass = await ClassService.DeletedClass(id)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, deleteClass))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message))
    }
}

export default { CreateClass, GetAllClass, GetClassById, UpdateClass, DeletedClass }