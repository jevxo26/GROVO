import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface UpazilaData {
  id: string | number;
  [key: string]: any;
}

export interface UpazilaResponse {
  success: boolean;
  message: string;
  data: UpazilaData | UpazilaData[];
}

export const upazilaApi = createApi({
  reducerPath: "upazilaApi",
  baseQuery,
  tagTypes: ["Upazila"],
  endpoints: (builder) => ({
    getAllUpazilas: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/upazilas", params } : "/upazilas"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "Upazila" as const, id })),
              { type: "Upazila" as const, id: "LIST" },
            ]
          : [{ type: "Upazila" as const, id: "LIST" }],
    }),
    getUpazilaById: builder.query<any, string | number>({
      query: (id) => "/upazilas/${id}",
      providesTags: (result, error, id) => [{ type: "Upazila", id }],
    }),
    createUpazila: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/upazilas",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Upazila", id: "LIST" }],
    }),
    updateUpazila: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/upazilas/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Upazila", id },
        { type: "Upazila", id: "LIST" },
      ],
    }),
    deleteUpazila: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/upazilas/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Upazila", id },
        { type: "Upazila", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllUpazilasQuery,
  useGetUpazilaByIdQuery,
  useCreateUpazilaMutation,
  useUpdateUpazilaMutation,
  useDeleteUpazilaMutation,
} = upazilaApi;
