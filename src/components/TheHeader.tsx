function TheHeader() {
    return (
        <div className='text-white'>
           <nav className="flex justify-center">
            <Link className="mr-5" to="/">首頁</Link>
            <Link className="mr-5" to="/About">About</Link>
            <Link className="mr-5" to="/Login">LogIn</Link>
            <Link className="mr-5" to="/SignUp">SignUp</Link>
           </nav>
        </div>
    )
}
export default TheHeader