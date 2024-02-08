import { configureStore } from "@reduxjs/toolkit"
import { userApi } from "../services/api/userApi"
import userSlice from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
