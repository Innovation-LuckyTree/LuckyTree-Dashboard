export interface UserAuth{
    name: string;
    id: number;
}

export interface AuthResponse{
    token: string;
    user: UserAuth;
}