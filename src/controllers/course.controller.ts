import { Request, Response } from "express";
import CourseService from "@/services/course.service";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import HttpResponseData from "@/common/httpResponseData";
import HttpException from "@/common/httpException";

const CreateCourse = async (req: Request, res: Response) => {
    const payload = req.body
    try {
        const newCourse: any = await CourseService.CreateCourse(payload)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, newCourse))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message))
    }
}

const UploadImage = async (req: Request, res: Response) => {
    const file: any = req.files
    try {
        let result = []
        for (let i = 0; i < file.length; i++) {
            result.push(file[i].path)
        }
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, result))
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
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
    }
}

const GetCourseById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const courseExist = await CourseService.FindCourseById(id)
        if (!courseExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
        }
        return res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, courseExist))
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404))
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
        const updateCourse = await CourseService.UpdateCourse(id, update)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, updateCourse))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message))
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
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400, error.message))
    }
}

export default { CreateCourse, GetAllCourse, GetCourseById, UpdateCourse, DeletedCourse, UploadImage }