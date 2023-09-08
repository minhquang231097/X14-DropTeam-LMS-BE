export interface UpdateClassDto {
  mentor_id?: string;
  workplace_id?: string;
  course_id?: string;
  class_code?: string;
  start_at?: string;
  end_at?: string;
  schedule?: [number];
  class_size?: number;
  total_session?: number;
  total_hours?: number;
  status?: string;
}

export interface CreateClassDto {
  mentor_id: string;
  workplace_id: string;
  course_id: string;
  class_code: string;
  start_at: string;
  end_at?: string;
  schedule: [number];
  class_size: number;
  total_hours?: number;
  total_session: number;
  status?: string;
  minimum_size?: number
}

export interface ClassResponseDto {
  _id?: string;
  mentor?: string;
  workplace?: string;
  course?: string;
  class_code?: string;
  start_at?: string;
  end_at?: string;
  schedule?: [number];
  class_size?: number;
  total_hours?: number;
  total_session?: number;
  status?: string;
}

export interface AddStudentToClassDto {
  student_id: string;
  status?: string;
}

export interface UpdateStatusStudentInClassDto {
  student_id: string;
  class_id: string;
  status?: string;
}
