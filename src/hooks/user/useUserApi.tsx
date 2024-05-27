import { User } from "../../types/auth"
import { useAxios } from "../useAxios"
import { useAppSelector } from '../../store/hooks'
export default function useUserApi(){
    const { fetchData } = useAxios()
    async function getAllUserRequest(){
        return await fetchData<User[]>('/users','GET')
    }
    return {
        //methods
        getAllUserRequest,
    }
}