import GoogleLoginButton from "../components/GoogleLoginButton"
import useAuth from "../hooks/auth/useAuth"
import useUser from "../hooks/user/useUser"
function Login() {
    const { login } = useAuth()
    const { user } = useUser()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function onEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event?.target.value.trim())
    }
    function onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event?.target.value.trim())
    }
    function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            login({ email, password })
        }
    }

    return (
        <div className=''>
            { !user ?
                <section>
                    <h1>使用者登入</h1>
                    <header className="">
                        <input type="text" value={email} onChange={onEmailChange} onKeyDown={onKeyDown} placeholder="請輸入email" />
                        <input type="text" value={password} onChange={onPasswordChange} onKeyDown={onKeyDown} placeholder="請輸入password" />
                        <button onClick={() => login({ email, password })}>登入</button>
                    </header>
                    <GoogleLoginButton />
                </section> :
                <section>
                    <p>您已經登入了</p>
                    <Link to="/">返回首頁</Link>
                </section>
        }
        </div>
    )
}
export default Login