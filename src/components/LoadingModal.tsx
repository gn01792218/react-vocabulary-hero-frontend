import { useLoading } from '../hooks/useLoading'
import MyModal from './MyModal'

export default function LoadingModal(){
    const { loading, isLoading } = useLoading()
    
    return (
      <MyModal title='資料處理中...' open={loading} onClose={()=>isLoading(false)} backdrop={true}>
        <p>....</p>
      </MyModal>    
      )
}