export interface UpdateCourseDto {
  course_code?: string;
  title?: string;
  image?: [string];
  session_per_course?: number;
  price?: number;
  desc?: string;
  level?: number;
  rate?: number;
  discount?: number;
}

export interface FindCourseDto {
  _id?: string;
  course_code?: string;
  title?: string;
  image?: [string];
  session_per_course?: number;
  price?: number;
  desc?: string;
  level?: number;
  rate?: number;
  discount?: number;
}

export interface CreateCourseDto {
  course_code: string;
  title: string;
  image: [string];
  session_per_course: number;
  price: number;
  desc: string;
  level: string;
  rate: number;
  discount: number;
  create_at: string;
}
