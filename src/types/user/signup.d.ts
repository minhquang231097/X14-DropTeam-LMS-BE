export interface SignUpBody {
    fullname: string,
    email: string,
    phone_number: string,
    username: string,
    password: string,
    create_at?: Date
}