import Routers from './router/Routers'
import TheHeader from './components/TheHeader'
import { LocalStorageItem } from './types/localStorage'
import { useAppDispatch } from './store/hooks'
import { setAccessToken, setRefreshToken } from './store/authSlice'
import useAuth from './hooks/auth/useAuth'
import useVocabulary from './hooks/vocabulary/useVocabulary'
function App() {
  const dispatch = useAppDispatch()

  const { refreshToken, getUserInformation } = useAuth()
  const { getAllVocabulary } = useVocabulary()
  const navigate = useNavigate()
  
  useEffect(()=>{
    initUser()
    initVocabulary()
  },[])

  //computed
  useMemo(()=>getUserInformation(),[refreshToken]) //取得refreshToken時候再要使用者的資料

  function initVocabulary() {
    getAllVocabulary()
  }

  function initUser(){
    //先下載localStorage裡面的token
    const refreshToken = localStorage.getItem(LocalStorageItem.ACCESSTOKEN)
    const accessToken = localStorage.getItem(LocalStorageItem.REFRESHTOKEN)
    if(!refreshToken) return navigate('/Login') //沒有refreshToken代表已經登出了

    dispatch(setAccessToken(refreshToken))
    if(accessToken) dispatch(setRefreshToken(accessToken))
  }
  
  return (
    <div className="App bg-gray-500 min-h-screen">
      <TheHeader/>
      <Routers />
    </div>
  )
}

export default App
