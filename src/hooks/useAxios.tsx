import axios, { AxiosError, AxiosResponse } from 'axios'
import { LocalStorageItem } from '../types/localStorage'
import { FetchOptions } from "../types/fetch"
import { useLoading } from './useLoading'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})
// axiosInstance.interceptors.request.use((config) => {
//     return config
// }, (error) => Promise.reject(error))
axiosInstance.interceptors.response.use((respons) => {
    return respons
}, (error:AxiosError) => {
    console.log(error.response?.data)
    let errMsg = ''
    switch(error.response?.status){
        case 401:
            errMsg =`accessToken過期。${error}`
            break
        case 403:
            errMsg = `身分驗證未通過。${error}`
            break
    }
    return Promise.reject(errMsg)
})

export function useAxios() {
    const { isLoading } = useLoading()

    async function fetchData<T>(url: string, method: string, options?: FetchOptions) {
        isLoading(true)
        try{
            const {data}: AxiosResponse<T> = await axiosInstance({
                url,
                method,
                data: options?.payload,
                headers: { Authorization: `Bearer ${localStorage.getItem(LocalStorageItem.ACCESSTOKEN)}` }
            })
            return data
        }catch(error){
            console.log(error)
        }finally{
            setTimeout(()=>{
                isLoading(false)
            }, 500)
        }
    }

    return {
        //method
        fetchData
    }
}