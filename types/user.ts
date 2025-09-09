import { PaginateResponse, Pagination } from "@/lib/pagination";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    VERIFICATION_PENDING = "verification_pending",
    SUSPENDED = "suspended",
}

export interface User { 
    id: string;
    email: string;
    username: string;
    role: UserRole;
    status: UserStatus;
}

export interface UserResponse extends User {
    status: UserStatus;
    total_urls: number;
    total_clicks: number;
    created_at: Date;
    updated_at: Date;
}

export interface UserListResponse extends PaginateResponse<UserResponse> {
    data: UserResponse[];
    pagination: Pagination;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    email: string;
    username: string;
    password: string;
}