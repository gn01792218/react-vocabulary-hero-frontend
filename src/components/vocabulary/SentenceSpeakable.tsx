import { FcAdvertising } from 'react-icons/fc'
import { useSpeech } from "../../hooks/useSpeech"
interface Props {
    text: string,
}
function SentenceSpeakable({ text }: Props) {
    const { speak } = useSpeech()
    return (
        <div className='flex flex-col' onClick={() => speak(text)}>
            <div className='flex items-center'>
                <p className='mr-2 text-sm font-bold'>{text}</p>
                <FcAdvertising className='cursor-pointer ml-auto' size={25} />
            </div>
        </div>
    )
}
export default SentenceSpeakable