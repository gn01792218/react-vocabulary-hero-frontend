//先引入相關依賴
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import { Note } from "../types/note"

//1.定義state
interface State { // 定義 a type for the slice state
    notes: Note[],
    currentNote:Note | null
  }
  const initialState: State = { // 定義 the initial state using that type
    notes:[],
    currentNote:null
  }

  //2.撰寫reducer函式
export const slice = createSlice({
    name: 'Note',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      setNotes: (state, action: PayloadAction<Note[]>) => {
        state.notes = action.payload
      },
      setCurrentNote: (state, action: PayloadAction<Note>) => {
        state.currentNote = action.payload
      },
    },
  })

  //3.導出reducer
export const { setNotes, setCurrentNote } = slice.actions

//4.導出state
//Other code such as selectors can use the imported `RootState` type
export const Notes = (state: RootState) => state.note.notes

export default slice.reducer