import Routers from './router/Routers'
import TheHeader from './components/TheHeader'
import useAuth from './hooks/auth/useAuth'
import LoadingModal from './components/LoadingModal'
import useUser from './hooks/user/useUser'
import SpeechSelect from './components/SpeechSelect'
function App() {
  const { refreshToken, getUserInformation } = useAuth()
  const { initUser } = useUser() 
  useEffect(()=>{
    initUser()
  },[])

  //computed
  useMemo(()=>getUserInformation(),[refreshToken]) //取得refreshToken時候再要使用者的資料
  
  return (
    <div className="App bg-gray-500 min-h-screen">
      <SpeechSelect/>
      <TheHeader/>
      <Routers />
      <LoadingModal/>
    </div>
  )
}

export default App
