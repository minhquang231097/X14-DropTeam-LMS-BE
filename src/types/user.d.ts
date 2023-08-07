export interface SignInDto {
    username: string,
    password: string
}

export interface SignOutDto {
    id: string
}

export interface UpdateUserDto {
    fullname?: string,
    email?: string,
    phone_number?: string,
    username?: string,
    password?: string,
    refreshToken?: string,
    create_at?: Date,
    role?: string,
    dob?: string,
    gender?: string,
    address?: string,
}

export interface FindUserDto {
    fullname?: string,
    email?: string,
    phone_number?: string,
    username?: string,
    role?: string,
    gender?: string,
    address?: string,
    refreshToken?: string
}

export interface ChangePassword {
    password?: string,
}
