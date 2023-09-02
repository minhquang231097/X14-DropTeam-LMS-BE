export interface RegistCourseDto {
  fullname: string;
  email: string;
  phone_number: number;
  course_id: string;
  workplace_id: string;
  note: string;
  student_id: string;
  create_at: string;
}
export interface AdminRegistCourseDto {
  course_id?: string;
  workplace_id?: string;
  note?: string;
  student_id?: string;
  create_at?: string;
}

export interface StudentRegistCourseDto {
  course_id: string;
  workplace_id: string;
  note?: string;
  create_at: string;
}

export interface UpdateRegistCourseDto {
  course?: string;
  workplace?: string;
  note?: string;
}

