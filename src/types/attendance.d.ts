export interface CreateAttendanceDto {
  session_id?: string;
  class_id?: string;
}

export interface CreateAttendanceStudentDto {
  attendance_id: string;
  student_id: string;
  score?: string;
  status?: statusStudent;
  comment?: string;
  create_at?: string;
}

export interface UpdateAttendanceDto {
  session?: string;
  class?: string;
}

export interface FindAttendanceDto {
  _id?: string;
  session?: string;
  class?: string;
}
