import useUserApi from '../../hooks/user/useUserApi'
import { useDispatch } from "react-redux"
import { setUsers } from "../../store/userSlice"
import { useAppSelector } from '../../store/hooks'
export default function useUser(){
    const { getAllUserRequest } = useUserApi()
    const dispatch = useDispatch()
    const user = useAppSelector(state=>state.user.user)
    async function getAllUser(){
        const users = await getAllUserRequest()
        if(users) dispatch(setUsers(users))
    }
    return {
        //data
        user,
        //methods
        getAllUser,
    }
}