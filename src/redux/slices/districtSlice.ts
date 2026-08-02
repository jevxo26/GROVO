import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface DistrictData {
  id: string | number;
  [key: string]: any;
}

export interface DistrictResponse {
  success: boolean;
  message: string;
  data: DistrictData | DistrictData[];
}

export const districtApi = createApi({
  reducerPath: "districtApi",
  baseQuery,
  tagTypes: ["District"],
  endpoints: (builder) => ({
    getAllDistricts: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/districts", params } : "/districts"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "District" as const, id })),
              { type: "District" as const, id: "LIST" },
            ]
          : [{ type: "District" as const, id: "LIST" }],
    }),
    getDistrictById: builder.query<any, string | number>({
      query: (id) => "/districts/${id}",
      providesTags: (result, error, id) => [{ type: "District", id }],
    }),
    createDistrict: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/districts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "District", id: "LIST" }],
    }),
    updateDistrict: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/districts/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "District", id },
        { type: "District", id: "LIST" },
      ],
    }),
    deleteDistrict: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/districts/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "District", id },
        { type: "District", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllDistrictsQuery,
  useGetDistrictByIdQuery,
  useCreateDistrictMutation,
  useUpdateDistrictMutation,
  useDeleteDistrictMutation,
} = districtApi;
