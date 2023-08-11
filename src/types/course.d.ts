export interface UpdateCourseDto {
  course_code?: string;
  title?: string;
  image?: [string];
  session_per_course?: number;
  price?: number;
  desc?: string;
  duration?: number;
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
  duration?: number;
  level?: number;
  rate?: number;
  discount?: number;
}
