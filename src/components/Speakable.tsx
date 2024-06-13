import { FcAdvertising } from 'react-icons/fc'
import { useSpeech } from "../hooks/useSpeech"
interface Props {
    text: string
}
function Speakable({ text }: Props) {
    const { speak } = useSpeech()
    return (
        <div className='flex' onClick={() => speak(text)}>
            <p className='mr-2'>{text}</p>
            <FcAdvertising className='cursor-pointer' size={25} />
        </div>
    )
}
export default Speakable