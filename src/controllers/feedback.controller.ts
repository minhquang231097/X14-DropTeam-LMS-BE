import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import feedbackService from "@/services/feedback.service";
import { Request, Response } from "express";

const CreateNewFeekback = async (req: Request, res: Response) => {
  const payload = req.body;
  const { course, email } = req.body;
  try {
    const session = await feedbackService.CreateFeedback(course, email, payload);
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.CREATE_SUCCES, 200, session));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.FEEDBACK.WRONG, 400));
  }
};

const GetFeedback = async (req: Request, res: Response) => {
  const { page, limit, course, email } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    const countDoc = await feedbackService.GetTotalFeedback();
    if (course) {
      const num = await feedbackService.GetFeedbackByCourseCode(course as string);
      const result = await feedbackService.GetFeedbackByCourseCode(course as string, p, l);
      if (!result) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.FEEDBACK.NOT_FOUND, 404));
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.FOUND_SUCCESS, 200, {
          list: result,
          count: result.length,
          page: p,
          total: countDoc,
          total_page: Math.ceil(num.length / l),
        }),
      );
    } else if (email) {
      const num = await feedbackService.GetFeedbackByEmailStudent(email as string);
      const result = await feedbackService.GetFeedbackByEmailStudent(email as string, p, l);
      if (!result) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.FEEDBACK.NOT_FOUND, 404));
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.FOUND_SUCCESS, 200, {
          list: result,
          count: result.length,
          page: p,
          total: countDoc,
          total_page: Math.ceil(num.length / l),
        }),
      );
    } else if (page && limit) {
      const result = await feedbackService.GetFeedbackByCondition(p, l);
      if (!result) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.FEEDBACK.NOT_FOUND, 404));
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.FOUND_SUCCESS, 200, {
          list: result,
          count: result.length,
          page: p,
          total: countDoc,
          total_page: Math.ceil(countDoc / l),
        }),
      );
    } else {
      const result = await feedbackService.GetFeedbackByCondition(1, 10);
      if (!result) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.FEEDBACK.NOT_FOUND, 404));
      res.json(
        new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.FOUND_SUCCESS, 200, {
          list: result,
          count: result.length,
          page: 1,
          total: countDoc,
        }),
      );
    }
  } catch (error: any) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.FEEDBACK.WRONG, 400, error.message));
  }
};

const UpdateFeedback = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const feedback = await feedbackService.UpdateFeedback(id as string, payload);
    if (!feedback) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.FEEDBACK.NOT_FOUND, 404));
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.UPDATE_SUCCESS, 200, feedback));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.FEEDBACK.WRONG, 400));
  }
};

const DeleteFeedback = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const feedback = await feedbackService.DeleteFeedbackById(id as string);
    if (!feedback) return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.FEEDBACK.NOT_FOUND, 404));
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.DELETE_SUCCESS, 200));
  } catch (error) {
    return res.json(new HttpException(RESPONSE_CONFIG.MESSAGE.FEEDBACK.WRONG, 400));
  }
};

export default {
  CreateNewFeekback,
  GetFeedback,
  UpdateFeedback,
  DeleteFeedback,
};
