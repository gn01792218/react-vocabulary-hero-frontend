import useUser from "../hooks/user/useUser"
import UserDropDownMenu from "./UserDropdownMenu"
function TheHeader() {
    const { user } = useUser()
    return (
        <div className='text-white flex items-center p-5 mx-auto w-full max-w-[400px]'>
            <p className="text-slate-300 mr-5">歡迎{user?.name}</p>
            <nav className="flex justify-center items-center">
                <Link className="mr-5" to="/">首頁</Link>
                <Link className="mr-5" to="/About">About</Link>
                {
                    user ?
                        <UserDropDownMenu />
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