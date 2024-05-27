//先引入相關依賴
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import { User } from '../types/auth'

//1.定義state
interface AuthState { // 定義 a type for the slice state
    accessToken: string
    refreshToken: string,
  }
  const initialState: AuthState = { // 定義 the initial state using that type
    accessToken:'',
    refreshToken:'',
  }

  //2.撰寫reducer函式
export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      setAccessToken: (state, action: PayloadAction<string>) => {
        state.accessToken = action.payload
      },
      setRefreshToken: (state, action: PayloadAction<string>) => {
        state.refreshToken = action.payload
      },
    },
  })

  //3.導出reducer
export const { setAccessToken, setRefreshToken } = authSlice.actions

//4.導出state
//Other code such as selectors can use the imported `RootState` type
export const accessToken = (state: RootState) => state.auth.accessToken
export const refreshToken = (state: RootState) => state.auth.refreshToken

export default authSlice.reducer