import { useDispatch } from "react-redux"
import { useAppSelector } from "../../store/hooks"
import { LogOutRequest, LoginRequest, LoginResponse, RefreshTokenRespon, SignUpRequest } from "../../types/auth"
import { LocalStorageItem } from "../../types/localStorage"
import useAuthApi from "./useAuthApi"
import { setAccessToken, setRefreshToken } from "../../store/authSlice"
import { setUser } from '../../store/userSlice'
import useUserApi from "../user/useUserApi"
export default function useAuth() {
    const navigate = useNavigate()
    const refreshToken = useAppSelector((state) => state.auth.refreshToken)
    const dispatch = useDispatch()
    const { loginRequest, signUpRequest, refreshTokenRequest, logOutRequest } = useAuthApi()
    const { getUserRequest } = useUserApi()
    async function signUp(payload: SignUpRequest) {
        if (!verifyLogin(payload)) return alert('請填寫正確的資料')
        if (!verifySignUp(payload)) return alert('密碼和確認密碼不一致')
        const user = await signUpRequest(payload)
        navigate('/Login')
    }
    async function login(payload: LoginRequest) {
        if (!verifyLogin(payload)) return alert('請填寫正確的資料')
        try {
            const tokenObject = await loginRequest(payload)
            if(!tokenObject) return
            setAuth(tokenObject)
            alert('登入成功!')
            navigate('/')
        } catch (error) {
            console.log(error)
            alert('出差錯了')
        }
    }
    async function logOut(payload: LogOutRequest) {
        if (!payload.accessToken) return alert('請帶入使用者id')
        try {
            const res = await logOutRequest(payload)
            if(!res) return
            removeAuth()
            alert(res.message)
            navigate('/')
        } catch (error) {
            alert('此使用者已被登出, 請重新登入')
            localStorage.removeItem(LocalStorageItem.ACCESSTOKEN) //403表示JWT驗證沒過，直接移除LocalStorage裡的accessToken
            navigate('/Login')
        }
    }
    async function refreshAccessToken() {
        if (!refreshToken) return alert('需要refreshToken')
        try {
            const token = await refreshTokenRequest({ refreshToken })
            if(token) setAuth(token)
        } catch (error) {
            console.log(error)
            navigate('/Login') //當refreshToken也過期時
        }
    }
    async function getUserInformation() { //專門給app初始化撈取使用者資料使用
        if (!refreshToken) return
        try {
            const user = await getUserRequest()
            if(user) dispatch(setUser(user))
        } catch (error) {
            refreshAccessToken()
        }
    }
    function verifyLogin(payload: LoginRequest) {
        if (!payload.email) return false
        if (!payload.password) return false
        return true
    }
    function verifySignUp(payload: SignUpRequest) {
        if (payload.confirmPassword.trim() !== payload.password.trim()) return false
        return true
    }
    function setAuth(token: LoginResponse | RefreshTokenRespon) {
        const { accessToken, refreshToken } = token
        localStorage.setItem(LocalStorageItem.ACCESSTOKEN, accessToken)
        localStorage.setItem(LocalStorageItem.REFRESHTOKEN, refreshToken)
        dispatch(setAccessToken(accessToken))
        dispatch(setRefreshToken(refreshToken))
        getUserInformation()
    }
    function removeAuth() {
        localStorage.removeItem(LocalStorageItem.ACCESSTOKEN)
        localStorage.removeItem(LocalStorageItem.REFRESHTOKEN)
        dispatch(setAccessToken(''))
        dispatch(setRefreshToken(''))
        dispatch(setUser(null))
    }
    return {
        //data
        refreshToken,
        //methods
        login,
        signUp,
        refreshAccessToken,
        logOut,
        getUserInformation,
        setAuth
    }
}