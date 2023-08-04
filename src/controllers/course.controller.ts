import { Request, Response } from "express";
import CourseService from "@/services/course.service";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import HttpResponseData from "@/common/httpResponseData";
import HttpException from "@/common/httpException";
import { Course, ICourse } from "@/models/course.model";

const CreateCourse = async (req: Request, res: Response) => {
    const payload = req.body
    try {
        const newCourse: ICourse = await CourseService.CreateCourse(payload)
        if (!newCourse) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400))
        }
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.CREATE_SUCCES, 200, newCourse))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400, error.message))
    }
}

const UploadImage = async (req: Request, res: Response) => {
    const file: any = req.files
    try {
        let result = []
        for (let i = 0; i < file.length; i++) {
            result.push(file[i].path)
        }
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.UPLOAD_IMG_SUCCESS, 200, result))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400, error.message))
    }
}

const GetAllCourse = async (req: Request, res: Response) => {
    const { page, limit, search } = req.query
    const p = Number(page)
    const l = Number(limit)
    const s = String(search)
    try {
        const allCourses = await CourseService.GetAllCourse(p, l, s)
        if (!allCourses) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404))
        }
        return res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, { list: allCourses, page: p, count: allCourses.length }))
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 404))
    }
}

const GetCourseById = async (req: Request, res: Response) => {
    const { id } = req.query
    const _id = String(id)
    try {
        const courseExist = await CourseService.GetCourseById(_id)
        if (!courseExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404))
        }
        return res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, courseExist))
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 404))
    }
}

const GetCourseByCode = async (req: Request, res: Response) => {
    const { code } = req.query
    const _code = String(code)
    try {
        const courseExist = await CourseService.GetCourseByCode(_code)
        if (!courseExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404))
        }
        return res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, courseExist))
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 404))
    }
}

const UpdateCourse = async (req: Request, res: Response) => {
    const { id } = req.query
    const _id = String(id)
    try {
        const update = req.body
        const courseExist = await CourseService.GetCourseById(_id)
        if (!courseExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 400))
        }
        await CourseService.UpdateCourse(_id, update)
        const updateCourse = await CourseService.GetCourseById(_id)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.UPDATE_SUCCESS, 200, updateCourse))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 400, error.message))
    }
}

const DeletedCourse = async (req: Request, res: Response) => {
    const { id } = req.query
    const _id = String(id)
    try {
        const courseExist = await CourseService.GetCourseById(_id)
        if (!courseExist) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 400))
        }
        const deleteCourse = await CourseService.DeletedCourse(_id)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.COURSE.DELETE_SUCCESS, 200, deleteCourse))
    } catch (error: any) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400, error.message))
    }
}

const DeletedAllCourse = async (req: Request, res: Response) => {
    try {
        const courseDeleted = await Course.deleteMany()
        if (!courseDeleted) {
            return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
        }
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
    }
}

export default { CreateCourse, GetAllCourse, GetCourseById, UpdateCourse, DeletedCourse, UploadImage, DeletedAllCourse, GetCourseByCode }