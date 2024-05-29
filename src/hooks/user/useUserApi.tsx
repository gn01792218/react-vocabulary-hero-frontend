import { User } from "../../types/auth"
import { useAxios } from "../useAxios"
export default function useUserApi(){
    const { fetchData } = useAxios()
    async function getAllUserRequest(){
        return await fetchData<User[]>('/users','GET')
    }
    async function getUserRequest(){
        return await fetchData<User>('/users/userInfo','GET')
    }
    return {
        //methods
        getAllUserRequest,
        getUserRequest,
    }
}