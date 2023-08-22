export interface CreateSessionDto {
  course_id?: string;
  class_id?: string;
  session_code?: string;
  desc?: string;
  status?: string;
}

export interface UpdateSessionDto {
  session_code?: string;
  desc?: string;
  status?: string;
}

export interface CreateSessionDto {
  course_id: string;
  class_id: string;
  session_code: string;
  desc: string;
  status: StatusSS;
  create_at?: string;
}
