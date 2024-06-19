import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCurrentVoiceNumber, setVoices } from "../store/speechSlice";

export interface SpeechVoice {
    name: string;
    lang: string;
}

export function useSpeech() {
  const dispatch = useAppDispatch()
  const voices = useAppSelector((state)=>state.speech.voices)
  const rate = useAppSelector((state)=>state.speech.rate); //0.1-10
  const volume = useAppSelector((state)=>state.speech.volumn); //0-1
  const pitch = useAppSelector((state)=>state.speech.pitch); //0-2
  const currentVoiceNumber = useAppSelector((state)=>state.speech.currentVoice)

  function getVoices(){
    const voices = window.speechSynthesis.getVoices() 
    alert(`有無voice${voices}`)
    if(voices) dispatch(setVoices([...voices]))
  }
  function switchCurrentVoice(index:number){
    dispatch(setCurrentVoiceNumber(index))
  }

  function speak(text: string) {
    const speakStr = new SpeechSynthesisUtterance(text);
    speakStr.rate = rate;
    speakStr.volume = volume;
    speakStr.pitch = pitch;
    speakStr.voice = voices[currentVoiceNumber] as SpeechSynthesisVoice
    speechSynthesis.speak(speakStr);
  }

  return {
    //data
    voices,
    currentVoiceNumber,
    //method
    getVoices,
    speak,
    switchCurrentVoice
  };
}
