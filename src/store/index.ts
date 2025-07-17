import {configureStore} from "@reduxjs/toolkit";
import {apiCategory} from "../services/apiCategory.ts";
import { apiAccount } from "../services/apiAccount.ts";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import authReducer from './authSlice';
import localCartReducer from './localCartSlice.ts';
import {apiProducts} from "../services/apiProducts.ts";
import {apiUser} from "../services/apiUser.ts";
import {apiCart} from "../services/apiCart.ts"; // шлях залежить від твоєї структури



export const store = configureStore({
    reducer: {
        [apiCategory.reducerPath]: apiCategory.reducer,
        [apiAccount.reducerPath]:apiAccount.reducer,
        [apiProducts.reducerPath]:apiProducts.reducer,
        [apiUser.reducerPath]: apiUser.reducer,
        [apiCart.reducerPath]: apiCart.reducer,
        auth: authReducer,
        localCart: localCartReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            apiCategory.middleware,
            apiAccount.middleware,
            apiProducts.middleware,
            apiUser.middleware,
            apiCart.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector