import { Suspense } from 'react'
import Home from '../views/Home'

function Routers() {
    //路遊懶加載
    const About = lazy(()=>import('../views/About'))
    const Login = lazy(()=>import('../views/Login'))
    const SignUp = lazy(()=>import('../views/SignUp'))
    const VocabularyDetial = lazy(()=>import('../views/VocabularyDetial'))
    const EditVocabulary = lazy(()=>import('../views/EditVocabulary'))
    return (
      <div className="App">
        <Suspense fallback={<div>Loading</div>}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/About" element={<About/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
                <Route path="/VocabularyDetial/:vocabularyId" element={<VocabularyDetial/>}/>
                <Route path="/EditVocabulary/:vocabularyId" element={<EditVocabulary/>}/>
            </Routes>
        </Suspense>
      </div>
    )
  }
  
export default Routers