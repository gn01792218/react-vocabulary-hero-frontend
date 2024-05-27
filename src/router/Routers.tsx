import { Suspense } from 'react'
import Home from '../views/Home'

function Routers() {
    //路遊懶加載
    const About = lazy(()=>import('../views/About'))
    const Login = lazy(()=>import('../views/Login'))
    const SignUp = lazy(()=>import('../views/SignUp'))
    return (
      <div className="App">
        <Suspense fallback={<div>Loading</div>}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/About" element={<About/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
            </Routes>
        </Suspense>
      </div>
    )
  }
  
export default Routers