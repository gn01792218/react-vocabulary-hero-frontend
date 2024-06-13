import { Suspense } from 'react'
import Home from '../views/Home'
import RoutGuard from '../components/RoutGuard'

function Routers() {
  //路遊懶加載
  const About = lazy(() => import('../views/About'))
  const Login = lazy(() => import('../views/Login'))
  const SignUp = lazy(() => import('../views/SignUp'))
  const VocabularyDetial = lazy(() => import('../views/VocabularyDetial'))
  const EditVocabulary = lazy(() => import('../views/EditVocabulary'))
  const NoteDetial = lazy(() => import('../views/NoteDetial'))
  const EditNote = lazy(() => import('../views/EditNote'))
  const Setting = lazy(()=>import('../views/Setting'))
  return (
    <div className="App">
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
        <Route element={<RoutGuard />}>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/VocabularyDetial/:vocabularyId" element={<VocabularyDetial />} />
          <Route path="/EditVocabulary/:vocabularyId" element={<EditVocabulary />} />
          <Route path="/NoteDetial/:noteId" element={<NoteDetial />} />
          <Route path="/EditNote/:noteId" element={<EditNote />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Setting" element={<Setting />} />
        </Route>
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default Routers