import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface BranchTransferData {
  id: string | number;
  [key: string]: any;
}

export interface BranchTransferResponse {
  success: boolean;
  message: string;
  data: BranchTransferData | BranchTransferData[];
}

export const branchTransferApi = createApi({
  reducerPath: "branchTransferApi",
  baseQuery,
  tagTypes: ["BranchTransfer"],
  endpoints: (builder) => ({
    getAllBranchTransfers: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/branch-transfers", params } : "/branch-transfers"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "BranchTransfer" as const, id })),
              { type: "BranchTransfer" as const, id: "LIST" },
            ]
          : [{ type: "BranchTransfer" as const, id: "LIST" }],
    }),
    getBranchTransferById: builder.query<any, string | number>({
      query: (id) => "/branch-transfers/${id}",
      providesTags: (result, error, id) => [{ type: "BranchTransfer", id }],
    }),
    createBranchTransfer: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/branch-transfers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "BranchTransfer", id: "LIST" }],
    }),
    updateBranchTransfer: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/branch-transfers/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BranchTransfer", id },
        { type: "BranchTransfer", id: "LIST" },
      ],
    }),
    deleteBranchTransfer: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/branch-transfers/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "BranchTransfer", id },
        { type: "BranchTransfer", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBranchTransfersQuery,
  useGetBranchTransferByIdQuery,
  useCreateBranchTransferMutation,
  useUpdateBranchTransferMutation,
  useDeleteBranchTransferMutation,
} = branchTransferApi;
