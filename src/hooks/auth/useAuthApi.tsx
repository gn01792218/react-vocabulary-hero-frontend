import { LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenRespon, SignUpRequest, User } from "../../types/auth"
import { useAxios } from "../useAxios"
export default function useAuthApi(){
    const { fetchData } = useAxios()
    async function loginRequest(payload:LoginRequest){
        return await fetchData<LoginResponse>('/users/login','POST',{payload})
    }
    async function signUpRequest(payload:SignUpRequest){
        return await fetchData<User>('/users/signUp','POST',{payload})
    }
    async function refreshTokenRequest(payload:RefreshTokenRequest){
        return await fetchData<RefreshTokenRespon>('/users/refreshToken','POST',{payload})
    }
    return {
        //methods
        loginRequest,
        signUpRequest,
        refreshTokenRequest
    }
}