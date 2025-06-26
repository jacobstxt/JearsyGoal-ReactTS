import {configureStore} from "@reduxjs/toolkit";
import {apiCategory} from "../services/apiCategory.ts";
import { apiAccount } from "../services/apiAccount.ts";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import authReducer from './authSlice';
import {apiProducts} from "../services/apiProducts.ts"; // шлях залежить від твоєї структури



export const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiCategory.reducerPath]: apiCategory.reducer,
        [apiAccount.reducerPath]:apiAccount.reducer,
        [apiProducts.reducerPath]:apiProducts.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            apiCategory.middleware,
            apiAccount.middleware,
            apiProducts.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector