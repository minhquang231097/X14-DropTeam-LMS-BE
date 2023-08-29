export interface UpdateLessonDto {
  session?: string;
  title?: string;
  content?: string;
  no?: number;
}

export interface CreateLessonDto {
  session_id: string;
  course_id: string;
  title: string;
  content: string;
  no: number;
  create_at: string;
}
