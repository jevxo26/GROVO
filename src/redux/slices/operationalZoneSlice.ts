import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface OperationalZoneData {
  id: string | number;
  [key: string]: any;
}

export interface OperationalZoneResponse {
  success: boolean;
  message: string;
  data: OperationalZoneData | OperationalZoneData[];
}

export const operationalZoneApi = createApi({
  reducerPath: "operationalZoneApi",
  baseQuery,
  tagTypes: ["OperationalZone"],
  endpoints: (builder) => ({
    getAllOperationalZones: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/operational-zones", params } : "/operational-zones"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "OperationalZone" as const, id })),
              { type: "OperationalZone" as const, id: "LIST" },
            ]
          : [{ type: "OperationalZone" as const, id: "LIST" }],
    }),
    getOperationalZoneById: builder.query<any, string | number>({
      query: (id) => "/operational-zones/${id}",
      providesTags: (result, error, id) => [{ type: "OperationalZone", id }],
    }),
    createOperationalZone: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/operational-zones",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "OperationalZone", id: "LIST" }],
    }),
    updateOperationalZone: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/operational-zones/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "OperationalZone", id },
        { type: "OperationalZone", id: "LIST" },
      ],
    }),
    deleteOperationalZone: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/operational-zones/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "OperationalZone", id },
        { type: "OperationalZone", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllOperationalZonesQuery,
  useGetOperationalZoneByIdQuery,
  useCreateOperationalZoneMutation,
  useUpdateOperationalZoneMutation,
  useDeleteOperationalZoneMutation,
} = operationalZoneApi;
