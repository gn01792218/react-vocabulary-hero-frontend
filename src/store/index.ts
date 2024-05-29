import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'  //引入reducer
import userReducer from './userSlice'
import vocabulary from './vocabularySlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    vocabulary:vocabulary
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store