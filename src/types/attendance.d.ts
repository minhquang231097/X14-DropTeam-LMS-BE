export interface CreateAttendanceDto {
  session_code?: string;
  class_code?: string;
  day: number;
  absence: number;
  class_size: number;
}

export interface UpdateAttendanceDto {
  session?: string;
  class?: string;
  day: number;
  absence: number;
  class_size: number;
}

export interface FindAttendanceDto {
  _id?: string;
  session?: string;
  class?: string;
  day: string;
  absence: string;
  class_size: number;
}
