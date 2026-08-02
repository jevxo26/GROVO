import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface BranchData {
  id: string | number;
  [key: string]: any;
}

export interface BranchResponse {
  success: boolean;
  message: string;
  data: BranchData | BranchData[];
}

export const branchApi = createApi({
  reducerPath: "branchApi",
  baseQuery,
  tagTypes: ["Branch"],
  endpoints: (builder) => ({
    getAllBranchs: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/branches", params } : "/branches"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "Branch" as const, id })),
              { type: "Branch" as const, id: "LIST" },
            ]
          : [{ type: "Branch" as const, id: "LIST" }],
    }),
    getBranchById: builder.query<any, string | number>({
      query: (id) => "/branches/${id}",
      providesTags: (result, error, id) => [{ type: "Branch", id }],
    }),
    getBranchesByOrgId: builder.query<any, string | number>({
      query: (orgId) => "/branches/organization/${orgId}",
      providesTags: [{ type: "Branch", id: "ORG_LIST" }],
    }),
    createBranch: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/branches",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Branch", id: "LIST" }],
    }),
    updateBranch: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/branches/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Branch", id },
        { type: "Branch", id: "LIST" },
      ],
    }),
    deleteBranch: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/branches/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Branch", id },
        { type: "Branch", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBranchsQuery,
  useGetBranchByIdQuery,
  useGetBranchesByOrgIdQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} = branchApi;
