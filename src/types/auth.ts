import { Role } from "./role"

export interface LoginRequest{
    email:string,
    password:string
}
export interface LoginResponse{
    accessToken:string //要存進localStorage
    refreshToken:string //要存進localStorage
}
export interface LogOutRequest{
    accessToken:string
}
export interface LogOutRespon{
    message:string
}
export interface RefreshTokenRequest{
    refreshToken:string
}
export interface RefreshTokenRespon{
    accessToken:string,
    refreshToken:string
}
export interface SignUpRequest{
    name:string,
    email:string,
    password:string,
    confirmPassword:string
}
export interface User{
    id:number,
    name:string,
    email:string,
    provider:string,
    roles:Role[]
}