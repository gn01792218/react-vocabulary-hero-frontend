
import useAuth from "../hooks/auth/useAuth"
import useUser from "../hooks/user/useUser"
function TheHeader() {
    const { logOut, accessToken } = useAuth()
    const { user } = useUser()
    const navigate = useNavigate()
    return (
        <div className='text-white'>
           <nav className="flex justify-center">
            <Link className="mr-5" to="/">首頁</Link>
            <Link className="mr-5" to="/About">About</Link>
            {
                user?
                <section>
                    <button className="mr-5" onClick={()=>logOut({accessToken})}>LogOut</button>
                    <p className="cursor-pointer text-gray-100" onClick={()=>navigate('/Setting')}>{user?.name}</p>
                </section>
                :
                <div>
                    <Link className="mr-5" to="/Login">LogIn</Link> 
                    <Link className="mr-5" to="/SignUp">SignUp</Link>
                </div>
            }
           </nav>
        </div>
    )
}
export default TheHeader