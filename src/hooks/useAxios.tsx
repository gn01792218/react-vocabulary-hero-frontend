import axios, { AxiosError, AxiosResponse } from 'axios'
import { LocalStorageItem } from '../types/localStorage'
import { FetchOptions } from "../types/fetch"

const axiosInstance = axios.create({
    baseURL: 'http://localhost:1222',
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
        case 403:
            
            errMsg = `身分驗證未通過。${error}`
            break
    }
    return Promise.reject(errMsg)
})

export function useAxios() {

    async function fetchData<T>(url: string, method: string, options?: FetchOptions) {
        const {data}: AxiosResponse<T> = await axiosInstance({
            url,
            method,
            data: options?.payload,
            headers: { Authorization: `Bearer ${localStorage.getItem(LocalStorageItem.ACCESSTOKEN)}` }
        })
        return data
    }

    return {
        //method
        fetchData
    }
}