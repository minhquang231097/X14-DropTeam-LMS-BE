export interface UpdateClassDto {
  mentor?: string;
  workplace?: string;
  course?: string;
  class_code?: string;
  start_at?: string;
  end_at?: string;
  schedule?: [number];
  class_size?: number;
  total_session?: number;
  total_hours?: number;
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
}

export interface AddStudentToClassDto {
  student_id: string;
  class_id: string;
  status?: string;
}

export interface UpdateStatusStudentInClassDto {
  student_id: string;
  class_id: string;
  status?: string;
}
