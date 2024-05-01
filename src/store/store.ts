import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { hackerNewsApi } from "./api/hackerNewApi";


const rootReducer = combineReducers({
    [hackerNewsApi.reducerPath]: hackerNewsApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(hackerNewsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;