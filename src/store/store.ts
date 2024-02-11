import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApi } from "../services/api/userApi";
import usersSlice from "./slices/usersSlice";

const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    users: usersSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};
