import { useImageToTextConvertor } from "../hooks/useImageToTextConvertor"
import MyInput from "./MyInput"

function ImageToTextConvertor() {
    const { converImageToText } = useImageToTextConvertor()
    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>){
        const files = e.target?.files
        if(!files) return
        const imageURL = URL.createObjectURL(files[0]);
        converImageToText(imageURL)
    }
    return (
        <MyInput type="file" label="" onChange={handleImageUpload}/>
    )
}
export default ImageToTextConvertor