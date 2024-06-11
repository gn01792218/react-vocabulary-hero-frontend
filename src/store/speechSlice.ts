//先引入相關依賴
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//1.定義state
interface State { // 定義 a type for the slice state
    rate:number,
    volumn:number,
    pitch:number,
    voices:SpeechSynthesisVoice[],
    currentVoice:number
  }
  const initialState: State = { // 定義 the initial state using that type
    rate:1, //0.1-10
    volumn:1, //0-1
    pitch:1, //0-2,
    voices:[],
    currentVoice:0
  }

  //2.撰寫reducer函式
export const slice = createSlice({
    name: 'speech',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      setRate: (state, action: PayloadAction<number>) => {
        state.rate = action.payload
      },
       setVolumn: (state, action: PayloadAction<number>) => {
        state.volumn = action.payload
      },
       setPitch: (state, action: PayloadAction<number>) => {
        state.pitch = action.payload
      },
      setVoices:(state, action:PayloadAction<SpeechSynthesisVoice[]>)=>{
        state.voices = action.payload
      },
      setCurrentVoiceNumber:(state, action:PayloadAction<number>)=>{
        state.currentVoice = action.payload
      }
    },
  })
export const { setRate, setVolumn, setPitch, setVoices, setCurrentVoiceNumber } = slice.actions
export default slice.reducer