import { User } from "../../types/auth"
import { useAxios } from "../useAxios"
import { useAppSelector } from '../../store/hooks'
export default function useUserApi(){
    const { fetchData } = useAxios()
    const accessToken = useAppSelector((state)=>state.auth.accessToken)
    async function getAllUserRequest(){
        return await fetchData<User[]>('/users','GET',{accessToken})
    }
    return {
        //methods
        getAllUserRequest,
    }
}