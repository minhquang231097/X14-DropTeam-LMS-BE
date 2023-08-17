export interface UpdateSessionDto {
  course?: string;
  session_code?: string;
  desc?: string;
}

export interface CreateSessionDto {
  course_code: string;
  class_code: string;
  session_code: string;
  desc: string;
  status: StatusSS;
  create_at?: string;
}
