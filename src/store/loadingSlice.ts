//先引入相關依賴
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'

//1.定義state
interface State { // 定義 a type for the slice state
    loading: boolean
  }
  const initialState: State = { // 定義 the initial state using that type
    loading:false,
  }

  //2.撰寫reducer函式
export const slice = createSlice({
    name: 'loading',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload
      }
    },
  })

  //3.導出reducer
export const { setLoading } = slice.actions

//4.導出state
//Other code such as selectors can use the imported `RootState` type
export const accessToken = (state: RootState) => state.auth.accessToken

export default slice.reducer