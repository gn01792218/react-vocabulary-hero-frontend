import axios, { AxiosResponse } from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:1222',
})

// axiosInstance.interceptors.request.use((config) => {
//     return config
// }, (error) => Promise.reject(error))
// axiosInstance.interceptors.response.use((respons) => {
//     return respons
// }, (error) => Promise.reject(error))

export function useAxios() {

    async function fetchData<T>(url: string, method: string, options?: FetchOptions) {
        const {data}: AxiosResponse<T> = await axiosInstance({
            url,
            method,
            data: options?.payload,
            headers: { Authorization: `Bearer ${options?.accessToken}` }
        })
        return data
    }

    return {
        //method
        fetchData
    }
}