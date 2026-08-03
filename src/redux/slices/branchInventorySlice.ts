import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface BranchInventoryData {
  id: string | number;
  [key: string]: any;
}

export interface BranchInventoryResponse {
  success: boolean;
  message: string;
  data: BranchInventoryData | BranchInventoryData[];
}

export const branchInventoryApi = createApi({
  reducerPath: "branchInventoryApi",
  baseQuery,
  tagTypes: ["BranchInventory"],
  endpoints: (builder) => ({
    getAllBranchInventorys: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/branch-inventories", params } : "/branch-inventories"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "BranchInventory" as const, id })),
              { type: "BranchInventory" as const, id: "LIST" },
            ]
          : [{ type: "BranchInventory" as const, id: "LIST" }],
    }),
    getBranchInventoryById: builder.query<any, string | number>({
      query: (id) => "/branch-inventories/${id}",
      providesTags: (result, error, id) => [{ type: "BranchInventory", id }],
    }),
    createBranchInventory: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/branch-inventories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "BranchInventory", id: "LIST" }],
    }),
    updateBranchInventory: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/branch-inventories/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BranchInventory", id },
        { type: "BranchInventory", id: "LIST" },
      ],
    }),
    deleteBranchInventory: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/branch-inventories/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "BranchInventory", id },
        { type: "BranchInventory", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBranchInventorysQuery,
  useGetBranchInventoryByIdQuery,
  useCreateBranchInventoryMutation,
  useUpdateBranchInventoryMutation,
  useDeleteBranchInventoryMutation,
} = branchInventoryApi;
