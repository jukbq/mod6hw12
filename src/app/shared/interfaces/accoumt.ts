export interface LoginRequest {
    login: string;
    email: string;
    password: string;
    phone: number;

}

export interface LoginResponse extends LoginRequest {
    id: number;

}