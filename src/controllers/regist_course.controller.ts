import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import regist_courseService from "@/services/regist_course.service";
import { Request, Response } from "express";

const RegistedNewCourse = async (req: Request, res: Response) => {
    const { _id } = req.user
    const id = String(_id)
    const { course_code, note } = req.body
    try {
        const newRegist = await regist_courseService.CreateRegistCourse(course_code, id, note)
        if (!newRegist) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], newRegist))
    } catch (error) {
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
    }
}

export default { RegistedNewCourse }