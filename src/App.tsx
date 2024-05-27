import Routers from './router/Routers'
import TheHeader from './components/TheHeader'
import { LocalStorageItem } from './types/localStorage'
import { useAppDispatch } from './store/hooks'
import { setAccessToken, setRefreshToken } from './store/authSlice'
function App() {
  const dispatch = useAppDispatch()
  
  useEffect(()=>{
    loadUserToken()
  },[])

  function loadUserToken(){
    dispatch(setAccessToken(localStorage.getItem(LocalStorageItem.ACCESSTOKEN) || ''))
    dispatch(setRefreshToken(localStorage.getItem(LocalStorageItem.REFRESHTOKEN) || ''))
  }
  
  return (
    <div className="App bg-gray-500 min-h-screen">
      <TheHeader/>
      <Routers />
    </div>
  )
}

export default App
