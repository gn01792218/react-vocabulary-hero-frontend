import useUserApi from '../../hooks/user/useUserApi'
import { setUsers } from "../../store/userSlice"
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { LocalStorageItem } from '../../types/localStorage'
import { setAccessToken, setRefreshToken } from '../../store/authSlice'
export default function useUser() {
    const { getAllUserRequest, getUserByIdRequest } = useUserApi()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user = useAppSelector(state => state.user.user)

    async function getAllUser() {
        const users = await getAllUserRequest()
        if (users) dispatch(setUsers(users))
    }
    async function getUserById(id: number) {
        return await getUserByIdRequest(id)
    }
    function initUser() {
        //先下載localStorage裡面的token
        const refreshToken = localStorage.getItem(LocalStorageItem.ACCESSTOKEN)
        const accessToken = localStorage.getItem(LocalStorageItem.REFRESHTOKEN)
        if (!refreshToken) return navigate('/Login') //沒有refreshToken代表已經登出了

        dispatch(setAccessToken(refreshToken))
        if (accessToken) dispatch(setRefreshToken(accessToken))
    }
    return {
        //data
        user,
        //methods
        getAllUser,
        getUserById,
        initUser
    }
}