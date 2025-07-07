import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../utilities/createBaseQuery.ts';
import type {IRegister} from "./types.ts";
import {serialize} from "object-to-formdata";

export interface ILoginRequest {
    email: string;
    password: string;
}

interface ILoginResponse {
    token: string;
}
export interface IForgotPasswordRequest {
    email: string;
}

export interface IResetPasswordRequest {
    password: string;
    confirmPassword: string;
    token: string;
    email: string;
}


export const apiAccount = createApi({
    reducerPath: 'api/account',
    baseQuery: createBaseQuery('account'),
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, ILoginRequest>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<ILoginResponse, IRegister>({
            query: (credentials) => {
                const formData = serialize(credentials);
                return{
                    url: 'register',
                    method: 'POST',
                    body: formData};
            },
        }),
        loginByGoogle: builder.mutation<{token: string}, string>({
            query: (token) => ({
                url: 'GoogleLogin',
                method: 'POST',
                body: {token}
            })
        }),

        forgotPassword: builder.mutation<IForgotPasswordRequest,void>({
            query: (data) => ({
                url: 'ForgotPassword',
                method: 'POST',
                body: data
            })
        }),

        validateResetToken: builder.mutation<{token: string}, boolean>({
            query: (token) => ({
                url: 'ValidateResetToken',
                method: 'POST',
                body: {token}
            })
        }),

        resetPassword: builder.mutation<IResetPasswordRequest, void>({
            query: (password) => ({
                url: 'ResetPassword',
                method: 'POST',
                body: password
            })
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLoginByGoogleMutation,
    useForgotPasswordMutation,
    // useValidateResetTokenMutation,
    useResetPasswordMutation,
} = apiAccount;