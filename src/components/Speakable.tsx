import { FcAdvertising } from 'react-icons/fc'
import { useSpeech } from "../hooks/useSpeech"
interface Props {
    text: string,
    pronunciation?: string
}
function Speakable({ text, pronunciation }: Props) {
    const { speak } = useSpeech()
    return (
        <div className='flex flex-col' onClick={() => speak(text)}>
            <div className='flex items-center'>
                <p className='mr-2 max-w-[80px] text-sm font-bold'>{text}</p>
                <FcAdvertising className='cursor-pointer ml-auto' size={25} />
            </div>
            <p className="mr-2 my-text-overflow text-sm">{pronunciation}</p>
        </div>
    )
}
export default Speakable