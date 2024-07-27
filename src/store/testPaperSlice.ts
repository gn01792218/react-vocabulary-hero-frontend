//先引入相關依賴
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import { TestPaper } from "../types/testPaper"

//1.定義state
interface State { // 定義 a type for the slice state
    testPapers: TestPaper[],
    currentTestPaper:TestPaper | null
  }
  const initialState: State = { // 定義 the initial state using that type
    testPapers:[],
    currentTestPaper:null
  }

  //2.撰寫reducer函式
export const slice = createSlice({
    name: 'TestPaper',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      setTestPapers: (state, action: PayloadAction<TestPaper[]>) => {
        state.testPapers = action.payload
      },
      setCurrentTestPaper: (state, action: PayloadAction<TestPaper>) => {
        state.currentTestPaper = action.payload
      },
    },
  })

  //3.導出reducer
export const { setTestPapers, setCurrentTestPaper } = slice.actions

//4.導出state
//Other code such as selectors can use the imported `RootState` type
export const TestPapers = (state: RootState) => state.testPaper.testPapers

export default slice.reducer