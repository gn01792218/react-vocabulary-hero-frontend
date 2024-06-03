import { CredentialResponse } from "@react-oauth/google"
import useAuthApi from "./useAuthApi"
import useAuth from "./useAuth"

export default function useGoogleLogin() {
    const navigate = useNavigate()
    const { loginWithGoogleByCredentialRequest } = useAuthApi()
    const { setAuth } = useAuth()
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string
    async function onGoogleLoginSuccess(credentialResponse: CredentialResponse) {
        if (!credentialResponse.credential) return console.log('出差錯了!')
        const tokenObject = await loginWithGoogleByCredentialRequest({ credential: credentialResponse.credential })
        if (!tokenObject) return
        setAuth(tokenObject)
        alert('登入成功!')
        navigate('/')
    }
    function onGoogleLoginError() {
        console.log('Google Login Fail')
    }

    return {
        //data
        googleClientId,
        //methods
        onGoogleLoginSuccess,
        onGoogleLoginError
    }
}