import { useDispatch } from "react-redux"
import { useAppSelector } from "../../store/hooks"
import { LogOutRequest, LoginRequest, LoginResponse, RefreshTokenRespon, SignUpRequest } from "../../types/auth"
import { LocalStorageItem } from "../../types/localStorage"
import useAuthApi from "./useAuthApi"
import { setAccessToken, setRefreshToken } from "../../store/authSlice"
export default function useAuth(){
    const navigate = useNavigate()
    const refreshToken = useAppSelector((state)=>state.auth.refreshToken)
    const dispatch = useDispatch()
    const { loginRequest, signUpRequest, refreshTokenRequest, logOutRequest } = useAuthApi()
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
        setAuthToken(tokenObject)
        alert('登入成功!')
        navigate('/')
    }
    async function logOut(payload:LogOutRequest){
        if(!payload.accessToken) return alert('請帶入使用者id')
        try{
            const { message } = await logOutRequest(payload)
            removeAuthToken()
            alert(message)
            navigate('/')
        }catch(error){
            alert('此使用者已被登出, 請重新登入')
            localStorage.removeItem(LocalStorageItem.ACCESSTOKEN) //403表示JWT驗證沒過，直接移除LocalStorage裡的accessToken
            navigate('/Login')
        }
    }
    async function refreshAccessToken(){
        if(!refreshToken) return alert('需要refreshToken')
        const token = await refreshTokenRequest({refreshToken})
        setAuthToken(token)
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
    function setAuthToken(token:LoginResponse | RefreshTokenRespon){
        const { accessToken, refreshToken } = token
        localStorage.setItem(LocalStorageItem.ACCESSTOKEN, accessToken)
        localStorage.setItem(LocalStorageItem.REFRESHTOKEN, refreshToken)
        dispatch(setAccessToken(accessToken))
        dispatch(setRefreshToken(refreshToken))
    }
    function removeAuthToken(){
        localStorage.removeItem(LocalStorageItem.ACCESSTOKEN)
        localStorage.removeItem(LocalStorageItem.REFRESHTOKEN)
        dispatch(setAccessToken(''))
        dispatch(setRefreshToken(''))
    }
    return {
        //methods
        login,
        signUp,
        refreshAccessToken,
        logOut
    }
}