import { useDispatch } from "react-redux"
import { useAppSelector } from "../../store/hooks"
import { LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenRespon, SignUpRequest } from "../../types/auth"
import { LocalStorageItem } from "../../types/localStorage"
import useAuthApi from "./useAuthApi"
import { setAccessToken, setRefreshToken } from "../../store/authSlice"
export default function useAuth(){
    const navigate = useNavigate()
    const refreshToken = useAppSelector((state)=>state.auth.refreshToken)
    const dispatch = useDispatch()
    const { loginRequest, signUpRequest, refreshTokenRequest } = useAuthApi()
     async function signUp(payload:SignUpRequest){
        if(!verifyLogin(payload))  return alert('請填寫正確的資料')
        if(!verifySignUp(payload)) return alert('密碼和確認密碼不一致')
        const user = await signUpRequest(payload)
        navigate('/Login')
    }
    async function login(payload:LoginRequest){
        if(!verifyLogin(payload)) return alert('請填寫正確的資料')
        const tokenObject = await loginRequest(payload)
        if(!tokenObject) return console.log('出了點錯誤')
        setAuthTokenInLocalStorage(tokenObject)
        alert('登入成功!')
        navigate('/')
    }
    async function refreshAccessToken(){
        if(!refreshToken) return alert('需要refreshToken')
        const token = await refreshTokenRequest({refreshToken})
        setAuthTokenInLocalStorage(token)
    }
    function verifyLogin(payload:LoginRequest){
        if(!payload.email) return false
        if(!payload.password) return false
        return true
    }
     function verifySignUp(payload:SignUpRequest){
        if(payload.confirmPassword.trim() !== payload.password.trim()) return false
        return true
    }
    function setAuthTokenInLocalStorage(token:LoginResponse | RefreshTokenRespon){
        const { accessToken, refreshToken } = token
        localStorage.setItem(LocalStorageItem.ACCESSTOKEN, accessToken)
        localStorage.setItem(LocalStorageItem.REFRESHTOKEN, refreshToken)
        dispatch(setAccessToken(accessToken))
        setRefreshToken(refreshToken)
    }
    return {
        //methods
        login,
        signUp,
        refreshAccessToken
    }
}