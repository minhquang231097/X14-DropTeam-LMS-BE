export interface CreateSessionDto {
  course_code?: string;
  class_code?: string;
  session_code?: string;
  session_name?: string;
  desc?: string;
  status?: string;
}

export interface UpdateSessionDto {
  session_code?: string;
  session_name?: string;
  desc?: string;
  status?: string;
}
