import { Request, Response } from "express";
import WorkplaceService from "@/services/workplace.service";
import { RESPONSE_CONFIG } from "@/configs/response.config"
import HttpResponseData from "@/common/httpResponseData";
import HttpException from "@/common/httpException";

const CreateWorkplace = async (req: Request, res: Response) => {
    try {
        const workplace: any = await WorkplaceService.CreateWorkplace(req.body)
        const updateWorkplace = await WorkplaceService.UpdateWorkplace(workplace._id)
        res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, updateWorkplace))
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

// const UpdateWorkplace = async (req: Request, res: Response) => {
//     try {
//         const { name, address, workplace_code } = req.body
//         const workplaceExist = await WorkplaceService.FindWorkplaceByName(name)
//         if (!workplaceExist) {
//             return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400))
//         }
//     } catch (error) {

//     }
// }

export default { CreateWorkplace, GetAllWorkplace }