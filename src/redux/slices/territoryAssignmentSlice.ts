import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface TerritoryAssignmentData {
  id: string | number;
  [key: string]: any;
}

export interface TerritoryAssignmentResponse {
  success: boolean;
  message: string;
  data: TerritoryAssignmentData | TerritoryAssignmentData[];
}

export const territoryAssignmentApi = createApi({
  reducerPath: "territoryAssignmentApi",
  baseQuery,
  tagTypes: ["TerritoryAssignment"],
  endpoints: (builder) => ({
    getAllTerritoryAssignments: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/territory-assignments", params } : "/territory-assignments"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "TerritoryAssignment" as const, id })),
              { type: "TerritoryAssignment" as const, id: "LIST" },
            ]
          : [{ type: "TerritoryAssignment" as const, id: "LIST" }],
    }),
    getTerritoryAssignmentById: builder.query<any, string | number>({
      query: (id) => "/territory-assignments/${id}",
      providesTags: (result, error, id) => [{ type: "TerritoryAssignment", id }],
    }),
    createTerritoryAssignment: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/territory-assignments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "TerritoryAssignment", id: "LIST" }],
    }),
    updateTerritoryAssignment: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/territory-assignments/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "TerritoryAssignment", id },
        { type: "TerritoryAssignment", id: "LIST" },
      ],
    }),
    deleteTerritoryAssignment: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/territory-assignments/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "TerritoryAssignment", id },
        { type: "TerritoryAssignment", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllTerritoryAssignmentsQuery,
  useGetTerritoryAssignmentByIdQuery,
  useCreateTerritoryAssignmentMutation,
  useUpdateTerritoryAssignmentMutation,
  useDeleteTerritoryAssignmentMutation,
} = territoryAssignmentApi;
