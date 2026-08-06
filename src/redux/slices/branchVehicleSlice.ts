import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface BranchVehicleData {
  id: string | number;
  [key: string]: any;
}

export interface BranchVehicleResponse {
  success: boolean;
  message: string;
  data: BranchVehicleData | BranchVehicleData[];
}

export const branchVehicleApi = createApi({
  reducerPath: "branchVehicleApi",
  baseQuery,
  tagTypes: ["BranchVehicle"],
  endpoints: (builder) => ({
    getAllBranchVehicles: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/branch-vehicles", params } : "/branch-vehicles"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "BranchVehicle" as const, id })),
              { type: "BranchVehicle" as const, id: "LIST" },
            ]
          : [{ type: "BranchVehicle" as const, id: "LIST" }],
    }),
    getBranchVehicleById: builder.query<any, string | number>({
      query: (id) => "/branch-vehicles/${id}",
      providesTags: (result, error, id) => [{ type: "BranchVehicle", id }],
    }),
    createBranchVehicle: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/branch-vehicles",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "BranchVehicle", id: "LIST" }],
    }),
    updateBranchVehicle: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/branch-vehicles/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BranchVehicle", id },
        { type: "BranchVehicle", id: "LIST" },
      ],
    }),
    deleteBranchVehicle: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/branch-vehicles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "BranchVehicle", id },
        { type: "BranchVehicle", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBranchVehiclesQuery,
  useGetBranchVehicleByIdQuery,
  useCreateBranchVehicleMutation,
  useUpdateBranchVehicleMutation,
  useDeleteBranchVehicleMutation,
} = branchVehicleApi;
