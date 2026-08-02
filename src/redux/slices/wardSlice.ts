import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface WardData {
  id: string | number;
  [key: string]: any;
}

export interface WardResponse {
  success: boolean;
  message: string;
  data: WardData | WardData[];
}

export const wardApi = createApi({
  reducerPath: "wardApi",
  baseQuery,
  tagTypes: ["Ward"],
  endpoints: (builder) => ({
    getAllWards: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/wards", params } : "/wards"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "Ward" as const, id })),
              { type: "Ward" as const, id: "LIST" },
            ]
          : [{ type: "Ward" as const, id: "LIST" }],
    }),
    getWardById: builder.query<any, string | number>({
      query: (id) => "/wards/${id}",
      providesTags: (result, error, id) => [{ type: "Ward", id }],
    }),
    createWard: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/wards",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Ward", id: "LIST" }],
    }),
    updateWard: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/wards/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Ward", id },
        { type: "Ward", id: "LIST" },
      ],
    }),
    deleteWard: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/wards/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Ward", id },
        { type: "Ward", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllWardsQuery,
  useGetWardByIdQuery,
  useCreateWardMutation,
  useUpdateWardMutation,
  useDeleteWardMutation,
} = wardApi;
