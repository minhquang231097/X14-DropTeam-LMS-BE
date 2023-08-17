export interface UpdateClassDto {
  mentor?: string;
  workplace?: string;
  course?: string;
  class_code?: string;
  start_at?: string;
  end_at?: string;
  expected_time_start?: string;
  hour_per_class?: string;
  schedule?: string;
  class_size?: number;
}

export interface ClassResponseDto {
  _id?: string;
  mentor?: string;
  workplace?: string;
  course?: string;
  class_code?: string;
  start_at?: string;
  end_at?: string;
  expected_time_start?: string;
  hour_per_class?: string;
  schedule?: string;
  class_size?: number;
  formated_date?: string;
}

export interface AddStudentToClassDto {
  email?: string;
  class_code?: string;
}