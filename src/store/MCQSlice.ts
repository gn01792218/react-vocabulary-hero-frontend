//先引入相關依賴
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import { MCQQuestion } from "../types/MCQ"

//1.定義state
interface State { // 定義 a type for the slice state
    MCQs: MCQQuestion[],
    currentMCQQuestion:MCQQuestion | null
  }
  const initialState: State = { // 定義 the initial state using that type
    MCQs:[],
    currentMCQQuestion:null
  }

  //2.撰寫reducer函式
export const slice = createSlice({
    name: 'MCQ',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      setMCQs: (state, action: PayloadAction<MCQQuestion[]>) => {
        state.MCQs = action.payload
      },
      setCurrentMCQQuestion: (state, action: PayloadAction<MCQQuestion>) => {
        state.currentMCQQuestion = action.payload
      },
    },
  })

  //3.導出reducer
export const { setMCQs, setCurrentMCQQuestion } = slice.actions

//4.導出state
//Other code such as selectors can use the imported `RootState` type
export const MCQs = (state: RootState) => state.MCQ.MCQs

export default slice.reducer