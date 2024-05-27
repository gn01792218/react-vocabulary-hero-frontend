
import useAuth from "../hooks/auth/useAuth"
import { useAppSelector } from "../store/hooks"
function TheHeader() {
    const accessToken = useAppSelector((state)=>state.auth.accessToken)
    const { logOut } = useAuth()
    return (
        <div className='text-white'>
           <nav className="flex justify-center">
            <Link className="mr-5" to="/">首頁</Link>
            <Link className="mr-5" to="/About">About</Link>
            {
                accessToken?
                <button className="mr-5" onClick={()=>logOut({accessToken})}>LogOut</button>:
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