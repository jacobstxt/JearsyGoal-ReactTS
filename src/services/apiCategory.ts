import {createApi} from "@reduxjs/toolkit/query/react";
import type {ICategoryCreate, ICategoryItem} from "./types.ts";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";


export const apiCategory = createApi({
    reducerPath: 'api',
    baseQuery: createBaseQuery('categories'),
    endpoints: (builder) => ({
        getAllCategories: builder.query<ICategoryItem[], void>({
            query: () => ''
        }),

        createCategory: builder.mutation<ICategoryItem, ICategoryCreate>({
            query : (newCategory) =>{
                try {
                    const formData = new FormData();
                    formData.append('name', newCategory.name);
                    formData.append('slug', newCategory.slug);
                    // @ts-expect-error
                    newCategory.image.forEach((file) => {
                        formData.append('image', file.originFileObj || file);
                    });
                    return {
                        url: '',
                        method: 'POST',
                        body: formData
                    }
                }
                catch {
                    throw  new Error("Error create Category");
                }
            }
        })

    }),
});

export const { useGetAllCategoriesQuery, useCreateCategoryMutation } = apiCategory;