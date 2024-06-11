import { Select } from '@headlessui/react'
import { useSpeech } from '../hooks/useSpeech'

export default function SpeechSelect() {
    const { getVoices, voices,  switchCurrentVoice } = useSpeech()
    useEffect(() => {
        window.speechSynthesis.addEventListener('voiceschanged', getVoices);
    }, [])
    return (
        <Select name="status" aria-label="Project status" onChange={(e)=>switchCurrentVoice(Number(e.target.value))}>
            {
                voices.map((v,index)=>{
                    return (
                        <option key={v.name} value={index}>{v.name}</option>
                    )
                })
            }
        </Select>
    )
}