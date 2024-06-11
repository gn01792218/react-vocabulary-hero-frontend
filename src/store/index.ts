import { configureStore } from '@reduxjs/toolkit'
import auth from './authSlice'  //引入reducer
import user from './userSlice'
import vocabulary from './vocabularySlice'
import loading from './loadingSlice'
import note from './noteSlice'
import speech from './speechSlice'

const store = configureStore({
  reducer: {
    loading,
    auth,
    user,
    vocabulary,
    note,
    speech
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store