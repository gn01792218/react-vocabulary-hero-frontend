import useUserApi from '../../hooks/user/useUserApi'
import { useDispatch } from "react-redux"
import { setUsers } from "../../store/userSlice"
export default function useUser(){
    const { getAllUserRequest } = useUserApi()
    const dispatch = useDispatch()
    async function getAllUser(){
        const users = await getAllUserRequest()
        if(!users) return alert('請求失敗')
        dispatch(setUsers(users))
    }
    return {
        //methods
        getAllUser,
    }
}