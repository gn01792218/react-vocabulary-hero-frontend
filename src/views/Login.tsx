import useAuth from "../hooks/auth/useAuth"
function Login() {
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function onEmailChange(event:React.ChangeEvent<HTMLInputElement>){
        setEmail(event?.target.value.trim())
    }
    function onPasswordChange(event:React.ChangeEvent<HTMLInputElement>){
        setPassword(event?.target.value.trim())
    }
    return (
        <div className=''>
            <h1>使用者登入</h1>
            <header className="">
               <input type="text" value={email} onChange={onEmailChange} placeholder="請輸入email"/> 
               <input type="text" value={password} onChange={onPasswordChange} placeholder="請輸入password"/> 
               <button onClick={()=>login({email,password})}>登入</button>
            </header>
        </div>
    )
}
export default Login