//先引入相關依賴
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import { Vocabulary } from '../types/vocabulary'

//1.定義state
interface State { // 定義 a type for the slice state
    vocabularys: Vocabulary[],
  }
  const initialState: State = { // 定義 the initial state using that type
    vocabularys:[],
  }

  //2.撰寫reducer函式
export const slice = createSlice({
    name: 'vocabulary',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      setVocabularys: (state, action: PayloadAction<Vocabulary[]>) => {
        state.vocabularys = action.payload
      },
    },
  })

  //3.導出reducer
export const { setVocabularys } = slice.actions

//4.導出state
//Other code such as selectors can use the imported `RootState` type
export const vocabularys = (state: RootState) => state.vocabulary.vocabularys

export default slice.reducer