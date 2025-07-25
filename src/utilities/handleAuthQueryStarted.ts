import type { Dispatch } from '@reduxjs/toolkit';
import {clearCart} from "../store/localCartSlice.ts";
import type {RootState} from "../store";
import type {IAuthResponse} from "../services/types.ts";
import {loginSuccess} from "../store/authSlice.ts";
import {apiCart} from "../services/apiCart.ts";


export const handleAuthQueryStarted = async (_arg : any,
                                             {dispatch, getState, queryFulfilled}:
                                             {
                                                 dispatch: Dispatch;
                                                 getState: () => RootState;
                                                 queryFulfilled: Promise<{ data: IAuthResponse }>;
                                             }) => {
    try {
        console.log('onQueryStarted');
        const {data} = await queryFulfilled;
        if (data && data.token) {
            dispatch(loginSuccess(data.token));
            const localCart = getState().localCart.items;
            console.log("Get Root State", localCart);
            if (localCart.length > 0) {
                await dispatch((apiCart.endpoints.addToCartsRange.initiate(localCart)) as any).unwrap();
            }
            dispatch(clearCart());
        }
    } catch (error) {
        console.error('Auth error:', error);
    }
};