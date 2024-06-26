//先引入相關依賴
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import { User } from '../types/auth'

//1.定義state
interface State { // 定義 a type for the slice state
    users: User[],
    user:User | null
  }
  const initialState: State = { // 定義 the initial state using that type
    users:[],
    user:null
  }

  //2.撰寫reducer函式
export const slice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      setUser: (state, action: PayloadAction<User | null>) => {
        state.user = action.payload
      },
      setUsers: (state, action: PayloadAction<User[]>) => {
        state.users = action.payload
      },
    },
  })

  //3.導出reducer
export const { setUsers, setUser } = slice.actions

//4.導出state
//Other code such as selectors can use the imported `RootState` type
export const users = (state: RootState) => state.user.users

export default slice.reducer