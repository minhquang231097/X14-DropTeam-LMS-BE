import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import classService from "@/services/class.service";
import { Request, Response } from "express";

const CreateNewClass = async (req: Request, res: Response) => {
    const { mentor, workplace, course } = req.body
    const payload = req.body
    try {
        const newClass = await classService.CreateOneClass(mentor, workplace, course, payload)
        if (!newClass) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
        }
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, newClass))
    } catch (error) {
        return res.json(res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400)))
    }
}

const GetAllClass = async (req: Request, res: Response) => {
    const { page, limit } = req.query
    const p = Number(page)
    const l = Number(limit)
    try {
        const allClasses = await classService.GetAllClass(p, l)
        if (!allClasses) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
        }
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, { list: allClasses, page: p, count: allClasses.length }))
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
    }
}

const GetClassById = async (req: Request, res: Response) => {
    const { id } = req.query
    const _id = String(id)
    try {
        const classExist = await classService.GetClassById(_id)
        if (!classExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
        }
        return res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, classExist))
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
    }
}

const GetClassByCode = async (req: Request, res: Response) => {
    const { code } = req.query
    const _code = String(code)
    try {
        const classExist = await classService.GetClassById(_code)
        if (!classExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
        }
        return res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, classExist))
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
    }
}

const UpdateClass = async (req: Request, res: Response) => {
    const { id } = req.query
    const _id = String(id)
    const update = req.body
    try {
        const classUpdated = await classService.UpdateOneClass(_id, update)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, classUpdated))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
    }
}

const DeleteOneClass = async (req: Request, res: Response) => {
    const { id } = req.query
    const _id = String(id)
    try {
        await classService.DeleteClassById(_id)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message))
    }
}

const DeleteManyCourse = async (req: Request, res: Response) => {
    const filter = req.body
    try {
        await classService.DeleteClassByCondition(filter)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message))
    }
}

export default { CreateNewClass, GetClassById, GetAllClass, UpdateClass, DeleteOneClass, DeleteManyCourse, GetClassByCode }