import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface RegionData {
  id: string | number;
  [key: string]: any;
}

export interface RegionResponse {
  success: boolean;
  message: string;
  data: RegionData | RegionData[];
}

export const regionApi = createApi({
  reducerPath: "regionApi",
  baseQuery,
  tagTypes: ["Region"],
  endpoints: (builder) => ({
    getAllRegions: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/regions", params } : "/regions"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "Region" as const, id })),
              { type: "Region" as const, id: "LIST" },
            ]
          : [{ type: "Region" as const, id: "LIST" }],
    }),
    getRegionById: builder.query<any, string | number>({
      query: (id) => "/regions/${id}",
      providesTags: (result, error, id) => [{ type: "Region", id }],
    }),
    createRegion: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/regions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Region", id: "LIST" }],
    }),
    updateRegion: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/regions/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Region", id },
        { type: "Region", id: "LIST" },
      ],
    }),
    deleteRegion: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/regions/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Region", id },
        { type: "Region", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllRegionsQuery,
  useGetRegionByIdQuery,
  useCreateRegionMutation,
  useUpdateRegionMutation,
  useDeleteRegionMutation,
} = regionApi;
