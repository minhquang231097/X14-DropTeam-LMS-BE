import { Request, Response } from "express";
import CourseService from "@/services/course.service";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import HttpResponseData from "@/common/httpResponseData";
import HttpException from "@/common/httpException";

const CreateCourse = async (req: Request, res: Response) => {
    try {
        const newCourse: any = await CourseService.CreateCourse(req.body)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, newCourse))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message))
    }
}

const GetAllCourse = async (req: Request, res: Response) => {
    const { page } = req.params
    const p = Number(page)
    try {
        const allCourses = await CourseService.GetAllCourse(p)
        return res.json(allCourses)
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
    }
}

const GetCourseById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const courseExist = await CourseService.FindCourseById(id)
        if (!courseExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
        }
        return res.json(courseExist)
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
    }
}

const UpdateCourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const update = req.body
        const courseExist = await CourseService.FindCourseById(id)
        if (!courseExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
        }
        await CourseService.UpdateCourse(id, update)
        const updateCourse = await CourseService.FindCourseById(id)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, updateCourse))
    } catch (error: any) {
        throw new HttpException(RESPONSE_CONFIG.MESSAGE[401], 401, error.message)
    }
}

const DeletedCourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const courseExist = await CourseService.FindCourseById(id)
        if (!courseExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
        }
        const deleteCourse = await CourseService.DeletedCourse(id)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, deleteCourse))
    } catch (error: any) {
        throw new HttpException(RESPONSE_CONFIG.MESSAGE[401], 401, error.message)
    }
}

export default { CreateCourse, GetAllCourse, GetCourseById, UpdateCourse, DeletedCourse }