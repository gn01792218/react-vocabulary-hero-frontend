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
       <section>
        <MyInput type="file" label="上傳圖片" onChange={handleImageUpload}/>
        {/* <button onClick={()=>converImageToText('https://techmoon.xyz/wp-content/uploads/2022/01/freepik.png')}>圖片轉文字</button> */}
       </section> 
    )
}
export default ImageToTextConvertor