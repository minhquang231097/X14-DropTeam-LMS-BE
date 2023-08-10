import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import feedbackService from "@/services/feedback.service";
import { Request, Response } from "express";

const CreateNewFeekback = async (req: Request, res: Response) => {
  const payload = req.body;
  const { course_code, email } = req.body;
  try {
    const session = await feedbackService.CreateFeedback(
      course_code,
      email,
      payload,
    );
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, session));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
  }
};

const GetFeedback = async (req: Request, res: Response) => {
  const { page, limit, course_code, email } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    if (course_code) {
      const feedback = await feedbackService.GetFeedbackByCourseCode(
        course_code as string,
      );
      if (!feedback)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, feedback),
      );
    } else if (email) {
      const student = await feedbackService.GetFeedbackByEmailStudent(
        email as string,
      );
      if (!student)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, student),
      );
    } else if (page && limit) {
      const all = await feedbackService.GetFeedbackByCondition(p, l);
      if (!all)
        return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
      res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, all));
    }
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
  }
};

const UpdateFeedback = async (req: Request, res: Response) => {
  const { id } = req.query;
  const payload = req.body;
  try {
    const feedback = await feedbackService.UpdateFeedback(
      id as string,
      payload,
    );
    if (!feedback)
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200, feedback));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
  }
};

const DeleteFeedback = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const feedback = await feedbackService.DeleteFeedbackById(id as string);
    if (!feedback)
      return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[404], 404));
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE[200], 200));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE[400], 400));
  }
};

export default {
  CreateNewFeekback,
  GetFeedback,
  UpdateFeedback,
  DeleteFeedback,
};
