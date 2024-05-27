import useAuth from "../hooks/auth/useAuth"
function SignUp() {
    const { signUp } = useAuth()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')

    function onNameChange(event:React.ChangeEvent<HTMLInputElement>){
        setName(event?.target.value.trim())
    }
    function onEmailChange(event:React.ChangeEvent<HTMLInputElement>){
        setEmail(event?.target.value.trim())
    }
    function onPasswordChange(event:React.ChangeEvent<HTMLInputElement>){
        setPassword(event?.target.value.trim())
    }
    function onConfirmPasswordChange(event:React.ChangeEvent<HTMLInputElement>){
        setconfirmPassword(event?.target.value.trim())
    }
    return (
        <div className=''>
            <h1>使用者註冊</h1>
            <header className="">
               <input type="text" value={name} onChange={onNameChange} placeholder="請輸入name"/> 
               <input type="text" value={email} onChange={onEmailChange} placeholder="請輸入email"/> 
               <input type="text" value={password} onChange={onPasswordChange} placeholder="請輸入password"/> 
               <input type="text" value={confirmPassword} onChange={onConfirmPasswordChange} placeholder="請輸入確認password"/> 
               <button onClick={()=>signUp({name, email,password,confirmPassword})}>註冊</button>
            </header>
        </div>
    )
}
export default SignUp