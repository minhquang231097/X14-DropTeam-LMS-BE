import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import courseService from "@/services/course.service";
import feedbackService from "@/services/feedback.service";
import userService from "@/services/user.service";
import { Request, Response } from "express";
import mongoose from "mongoose";

const LIMIT_PAGE_FEEDBACK = 10;

const CreateNewFeekback = async (req: Request, res: Response) => {
  const payload = req.body;
  const { course_id, student_id } = req.body;
  try {
    const [_course, _student] = await Promise.all([courseService.GetCourseById(course_id as string), userService.GetUserById(student_id as string)]);
    if (!_course || !_student) return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.FEEDBACK.NOT_FOUND, 404));
    const feedback = await feedbackService.CreateFeedback(payload);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.CREATE_SUCCES, 200, feedback));
  } catch (error) {
    return res.status(404).json(new HttpException(RESPONSE_CONFIG.MESSAGE.FEEDBACK.WRONG, 404));
  }
};

const GetFeedback = async (req: Request, res: Response) => {
  const { page, limit, course_id, student_id, search } = req.query;
  const p = Number(page);
  const l = Number(limit);
  try {
    if ((!student_id || mongoose.isValidObjectId(student_id)) && (!course_id || mongoose.isValidObjectId(course_id))) {
      const countDoc = await feedbackService.GetTotalFeedback();
      if (course_id) {
        const num = await feedbackService.GetFeedbackByCourseId(course_id as string);
        let result;
        if (p === undefined && l === undefined) {
          result = await feedbackService.GetFeedbackByCourseId(course_id as string, 1, LIMIT_PAGE_FEEDBACK);
        } else {
          result = await feedbackService.GetFeedbackByCourseId(course_id as string, p, l);
        }
        if (result.length === 0) return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.NOT_FOUND, 404));
        res
          .status(200)
          .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
      } else if (student_id) {
        const num = await feedbackService.GetFeedbackByStudentId(student_id as string);
        let result;
        if (p === undefined && l === undefined) {
          result = await feedbackService.GetFeedbackByStudentId(student_id as string, 1, LIMIT_PAGE_FEEDBACK);
        } else {
          result = await feedbackService.GetFeedbackByStudentId(student_id as string, p, l);
        }
        if (result.length === 0) return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.NOT_FOUND, 404));
        res
          .status(200)
          .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
      } else if (search) {
        const num = await feedbackService.SearchFeedbackByCondition(search as string);
        let result;
        if (p === undefined && l === undefined) {
          result = await feedbackService.SearchFeedbackByCondition(search as string, 1, LIMIT_PAGE_FEEDBACK);
        } else {
          result = await feedbackService.SearchFeedbackByCondition(search as string, p, l);
        }
        if (result.length === 0) return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.NOT_FOUND, 404));
        res
          .status(200)
          .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
      } else if (page && limit) {
        const result = await feedbackService.GetFeedbackByCondition(p, l);
        if (result.length === 0) return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.FOUND_NO_DATA, 404));
        res
          .status(200)
          .json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.FOUND_SUCCESS, 200, result, result.length, countDoc, p, Math.ceil(countDoc / l)));
      } else {
        const result = await feedbackService.GetFeedbackByCondition(1, LIMIT_PAGE_FEEDBACK);
        if (result.length === 0) return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.FOUND_NO_DATA, 404));
        res.json(
          new HttpResponseData(
            RESPONSE_CONFIG.MESSAGE.FEEDBACK.FOUND_SUCCESS,
            200,
            result,
            result.length,
            countDoc,
            1,
            Math.ceil(countDoc / LIMIT_PAGE_FEEDBACK),
          ),
        );
      }
    } else {
      return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.FEEDBACK.NOT_FOUND, 404));
    }
  } catch (error: any) {
    return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.FEEDBACK.NOT_FOUND, 404));
  }
};

const GetFeedbackInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const feedback = await feedbackService.GetFeedbackById(id as string);
    if (!feedback) return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.NOT_FOUND, 404));
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.FOUND_SUCCESS, 200, feedback));
  } catch (error) {
    return res.status(404).send(new HttpException(RESPONSE_CONFIG.MESSAGE.FEEDBACK.WRONG, 404));
  }
};

const UpdateFeedback = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const exist = await feedbackService.GetFeedbackById(id as string);
    if (!exist) return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.NOT_FOUND, 404));
    await feedbackService.UpdateFeedback(id as string, payload);
    const newFeedback = await feedbackService.GetFeedbackById(id as string);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.UPDATE_SUCCESS, 200, newFeedback));
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.FEEDBACK.WRONG, 400));
  }
};

const DeleteFeedback = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exist = await feedbackService.GetFeedbackById(id as string);
    if (!exist) return res.status(404).send(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.NOT_FOUND, 404));
    await feedbackService.DeleteFeedbackById(id as string);
    res.status(200).json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.FEEDBACK.DELETE_SUCCESS, 200));
  } catch (error) {
    return res.status(400).send(new HttpException(RESPONSE_CONFIG.MESSAGE.FEEDBACK.WRONG, 400));
  }
};

export default {
  CreateNewFeekback,
  GetFeedback,
  UpdateFeedback,
  DeleteFeedback,
  GetFeedbackInfo,
};
