import Routers from './router/Routers'
import TheHeader from './components/TheHeader'
import useAuth from './hooks/auth/useAuth'
import LoadingModal from './components/LoadingModal'
import useUser from './hooks/user/useUser'
import SpeechSelect from './components/SpeechSelect'
import { useSpeech } from './hooks/useSpeech'
function App() {
  const { refreshToken, getUserInformation } = useAuth()
  const { initUser } = useUser()
  const { getVoices } = useSpeech()
  useEffect(() => {
    window.speechSynthesis.addEventListener('voiceschanged', getVoices);
  }, [])
  useEffect(() => {
    initUser()
  }, [])

  //computed
  useMemo(() => getUserInformation(), [refreshToken]) //取得refreshToken時候再要使用者的資料

  return (
    <div className="App bg-gray-500 min-h-screen">
      <TheHeader />
      <Routers />
      <LoadingModal />
    </div>
  )
}

export default App
