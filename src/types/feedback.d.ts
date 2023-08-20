import { ObjectId } from "mongoose";

export interface CreateFeedbackDto {
  course_id: string;
  student_id: string;
  rating?: string;
  content?: string;
}

export interface UpdateFeedbackDto {
  course?: string;
  student?: string;
  rating?: string;
  content?: string;
  create_at?: string;
}

export interface FindFeedbackDto {
  _id?: ObjectId | string;
  course?: string;
  student?: string;
  rating?: string;
  content?: string;
  create_at?: string;
}
