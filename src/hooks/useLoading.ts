import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setLoading } from '../store/loadingSlice'

export function useLoading() {
    const dispatch = useAppDispatch()
    const loading = useAppSelector(state=>state.loading.loading)
    function isLoading(loading:boolean){
        dispatch(setLoading(loading))
    }
    return {
        //data
        loading,
        //method
        isLoading
    }
}