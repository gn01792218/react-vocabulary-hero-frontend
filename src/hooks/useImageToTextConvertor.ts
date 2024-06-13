import { createWorker } from 'tesseract.js'
import { useLoading } from './useLoading'

const recagnizeLangurage = ['eng'] //要加入中文請增加'chi_tra'
const worker = await createWorker(recagnizeLangurage)

export function useImageToTextConvertor() {
    const { isLoading } = useLoading()
    async function converImageToText(imgUrl:string){
        isLoading(true)
        const { data:{text} } = await worker.recognize(imgUrl)
        alert(text)
        await worker
        isLoading(false)
    }
    return {
        //data
        
        //method
        converImageToText
    }
}