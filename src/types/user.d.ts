export interface SignInDto {
  username: string;
  password: string;
}

export interface SignOutDto {
  id: string;
}

export interface UpdateUserDto {
  email?: string;
  fullname?: string;
  phone_number?: string;
  dob?: string;
  gender?: string;
  address?: string;
  avatar?: string;
}

export interface FindUserDto {
  _id?: string;
  fullname?: string;
  email?: string;
  phone_number?: string;
  username?: string;
  role?: string;
  gender?: string;
  address?: string;
  avatar?: string;
  refreshToken?: string;  
}

export interface SendEmailForgotPasswordDto {
  email?: string;
}

export interface NewPasswordDto {
  password?: string;
}

export interface ChangePasswordDto {
  password?: string;
  newPassword?: string;
}
