import { Select, Label, Field } from '@headlessui/react'
import { useSpeech } from '../hooks/useSpeech'

export default function SpeechSelect() {
    const { voices, switchCurrentVoice, currentVoiceNumber  } = useSpeech()
   
    return (
        <Field>
            <Label>選擇語音</Label>
            <Select name="status" aria-label="Project status" onChange={(e) => switchCurrentVoice(Number(e.target.value))}>
                {
                    voices.map((v, index) => {
                        return (
                            <option key={v.name} value={index} selected={v.name === voices[currentVoiceNumber].name}>{v.name}</option>
                        )
                    })
                }
            </Select>
        </Field>
    )
}