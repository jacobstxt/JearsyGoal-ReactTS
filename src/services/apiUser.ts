import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import type {
    IAdminUserItem, ISearchResult, IUserSearchParams
} from "./types.ts";

export const apiUser = createApi({
    reducerPath: 'api/User',
    baseQuery: createBaseQuery('User'),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getAllUsers: builder.query<IAdminUserItem[], void>({
            query: () => '',
            providesTags: ['User'],
        }),
        searchUsers: builder.query<ISearchResult<IAdminUserItem>, IUserSearchParams>({
            query: (params) => ({
                url: 'Search',
                params,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.items.map((u: IAdminUserItem) => ({ type: 'User' as const, id: u.id })),
                        { type: 'User', id: 'PARTIAL-LIST' },
                    ]
                    : [{ type: 'User', id: 'PARTIAL-LIST' }],
        }),
    }),
});


export const {
    useGetAllUsersQuery,
    useSearchUsersQuery
} = apiUser;