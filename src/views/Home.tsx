import VocabularyCreateForm from '../components/vocabulary/VocabularyCreateForm'
import VocabularyList from '../components/vocabulary/VocabularyList'
import useAuth from '../hooks/auth/useAuth'
import useUser from '../hooks/user/useUser'
function Home() {
    const { getAllUser } = useUser()
    const { refreshAccessToken } = useAuth()
    
    return (
        <div className=''>
            <h1>歡迎來到單字救星</h1>
            <header className="">
                <button onClick={getAllUser}>取得所有玩家列表</button>
                <button onClick={refreshAccessToken}>取得新Token</button>
            </header>
            <VocabularyCreateForm/>
            <VocabularyList editable={false}/> 
        </div>
    )
}
export default Home