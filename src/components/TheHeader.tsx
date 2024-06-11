
import useAuth from "../hooks/auth/useAuth"
import useUser from "../hooks/user/useUser"
function TheHeader() {
    const { logOut, accessToken } = useAuth()
    const { user } = useUser()
    return (
        <div className='text-white'>
           <nav className="flex justify-center">
            <Link className="mr-5" to="/">首頁</Link>
            <Link className="mr-5" to="/About">About</Link>
            {
                user?
                <section>
                    <button className="mr-5" onClick={()=>logOut({accessToken})}>LogOut</button>
                    <p className="text-gray-100">{user?.name}</p>
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