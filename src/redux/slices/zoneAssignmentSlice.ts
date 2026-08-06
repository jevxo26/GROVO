import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface ZoneAssignmentData {
  id: string | number;
  [key: string]: any;
}

export interface ZoneAssignmentResponse {
  success: boolean;
  message: string;
  data: ZoneAssignmentData | ZoneAssignmentData[];
}

export const zoneAssignmentApi = createApi({
  reducerPath: "zoneAssignmentApi",
  baseQuery,
  tagTypes: ["ZoneAssignment"],
  endpoints: (builder) => ({
    getAllZoneAssignments: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/zone-assignments", params } : "/zone-assignments"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "ZoneAssignment" as const, id })),
              { type: "ZoneAssignment" as const, id: "LIST" },
            ]
          : [{ type: "ZoneAssignment" as const, id: "LIST" }],
    }),
    getZoneAssignmentById: builder.query<any, string | number>({
      query: (id) => "/zone-assignments/${id}",
      providesTags: (result, error, id) => [{ type: "ZoneAssignment", id }],
    }),
    createZoneAssignment: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/zone-assignments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "ZoneAssignment", id: "LIST" }],
    }),
    updateZoneAssignment: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/zone-assignments/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ZoneAssignment", id },
        { type: "ZoneAssignment", id: "LIST" },
      ],
    }),
    deleteZoneAssignment: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/zone-assignments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "ZoneAssignment", id },
        { type: "ZoneAssignment", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllZoneAssignmentsQuery,
  useGetZoneAssignmentByIdQuery,
  useCreateZoneAssignmentMutation,
  useUpdateZoneAssignmentMutation,
  useDeleteZoneAssignmentMutation,
} = zoneAssignmentApi;
