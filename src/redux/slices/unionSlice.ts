import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface UnionData {
  id: string | number;
  [key: string]: any;
}

export interface UnionResponse {
  success: boolean;
  message: string;
  data: UnionData | UnionData[];
}

export const unionApi = createApi({
  reducerPath: "unionApi",
  baseQuery,
  tagTypes: ["Union"],
  endpoints: (builder) => ({
    getAllUnions: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/unions", params } : "/unions"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "Union" as const, id })),
              { type: "Union" as const, id: "LIST" },
            ]
          : [{ type: "Union" as const, id: "LIST" }],
    }),
    getUnionById: builder.query<any, string | number>({
      query: (id) => "/unions/${id}",
      providesTags: (result, error, id) => [{ type: "Union", id }],
    }),
    createUnion: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/unions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Union", id: "LIST" }],
    }),
    updateUnion: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/unions/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Union", id },
        { type: "Union", id: "LIST" },
      ],
    }),
    deleteUnion: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/unions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Union", id },
        { type: "Union", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllUnionsQuery,
  useGetUnionByIdQuery,
  useCreateUnionMutation,
  useUpdateUnionMutation,
  useDeleteUnionMutation,
} = unionApi;
