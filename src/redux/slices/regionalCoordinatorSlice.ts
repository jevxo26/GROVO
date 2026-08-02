import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface RegionalCoordinatorData {
  id: string | number;
  [key: string]: any;
}

export interface RegionalCoordinatorResponse {
  success: boolean;
  message: string;
  data: RegionalCoordinatorData | RegionalCoordinatorData[];
}

export const regionalCoordinatorApi = createApi({
  reducerPath: "regionalCoordinatorApi",
  baseQuery,
  tagTypes: ["RegionalCoordinator"],
  endpoints: (builder) => ({
    getAllRegionalCoordinators: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/regional-coordinators", params } : "/regional-coordinators"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "RegionalCoordinator" as const, id })),
              { type: "RegionalCoordinator" as const, id: "LIST" },
            ]
          : [{ type: "RegionalCoordinator" as const, id: "LIST" }],
    }),
    getRegionalCoordinatorById: builder.query<any, string | number>({
      query: (id) => "/regional-coordinators/${id}",
      providesTags: (result, error, id) => [{ type: "RegionalCoordinator", id }],
    }),
    createRegionalCoordinator: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/regional-coordinators",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "RegionalCoordinator", id: "LIST" }],
    }),
    updateRegionalCoordinator: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/regional-coordinators/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "RegionalCoordinator", id },
        { type: "RegionalCoordinator", id: "LIST" },
      ],
    }),
    deleteRegionalCoordinator: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/regional-coordinators/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "RegionalCoordinator", id },
        { type: "RegionalCoordinator", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllRegionalCoordinatorsQuery,
  useGetRegionalCoordinatorByIdQuery,
  useCreateRegionalCoordinatorMutation,
  useUpdateRegionalCoordinatorMutation,
  useDeleteRegionalCoordinatorMutation,
} = regionalCoordinatorApi;
