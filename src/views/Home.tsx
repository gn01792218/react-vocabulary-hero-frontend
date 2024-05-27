import useAuth from '../hooks/auth/useAuth'
import useUser from '../hooks/user/useUser'
import { useAppSelector } from '../store/hooks'
function Home() {
    const { getAllUser } = useUser()
    const { refreshAccessToken } = useAuth()
    const users = useAppSelector((state)=>state.user.users)
    
    return (
        <div className='text-white'>
            <h1>歡迎來到單字救星</h1>
            <header className="text-white">
                <button onClick={getAllUser}>取得所有玩家列表</button>
                <button onClick={refreshAccessToken}>取得新Token</button>
            </header>
            {
            users.map((user)=>{
                return (
                    <p>
                        {user.name}
                    </p>
                )
            })
            }
        </div>
    )
}
export default Home