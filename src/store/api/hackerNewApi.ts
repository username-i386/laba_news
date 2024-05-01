import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGetNewsItemResponse } from "../types/apiResponseTypes";


export const hackerNewsApi = createApi({
    reducerPath: 'hackerNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://hacker-news.firebaseio.com/v0/' }),
    endpoints: builder => ({
        getLastNews: builder.query<number[], void>({
            query: () => ({
                url: 'newstories.json',
                params: {
                    print: 'pretty',
                },
            }),
            transformResponse: (response: number[]): number[] => {
                return response.filter((_, index) => index < 100);
            },
        }),
        getNewsItem: builder.query<IGetNewsItemResponse, number>({
            query: (newsId = 1) => ({
                url: `item/${newsId}.json`,
                params: {
                    print: 'pretty',
                },
            }),
        }),
    }),
});

export const { 
    useGetLastNewsQuery,
    useGetNewsItemQuery,
} = hackerNewsApi;