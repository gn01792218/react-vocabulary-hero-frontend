import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import useGoogleLogin from "../hooks/auth/useGoogleLogin"
function GoogleLoginButton() {
    const { googleClientId, onGoogleLoginSuccess, onGoogleLoginError } = useGoogleLogin()
    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin
                useOneTap
                onSuccess={onGoogleLoginSuccess}
                onError={onGoogleLoginError}
            />
        </GoogleOAuthProvider>
    )
}
export default GoogleLoginButton