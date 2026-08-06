import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface BranchManagerData {
  id: string | number;
  [key: string]: any;
}

export interface BranchManagerResponse {
  success: boolean;
  message: string;
  data: BranchManagerData | BranchManagerData[];
}

export const branchManagerApi = createApi({
  reducerPath: "branchManagerApi",
  baseQuery,
  tagTypes: ["BranchManager"],
  endpoints: (builder) => ({
    getAllBranchManagers: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/branch-managers", params } : "/branch-managers"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "BranchManager" as const, id })),
              { type: "BranchManager" as const, id: "LIST" },
            ]
          : [{ type: "BranchManager" as const, id: "LIST" }],
    }),
    getBranchManagerById: builder.query<any, string | number>({
      query: (id) => "/branch-managers/${id}",
      providesTags: (result, error, id) => [{ type: "BranchManager", id }],
    }),
    createBranchManager: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/branch-managers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "BranchManager", id: "LIST" }],
    }),
    updateBranchManager: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/branch-managers/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BranchManager", id },
        { type: "BranchManager", id: "LIST" },
      ],
    }),
    deleteBranchManager: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/branch-managers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "BranchManager", id },
        { type: "BranchManager", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBranchManagersQuery,
  useGetBranchManagerByIdQuery,
  useCreateBranchManagerMutation,
  useUpdateBranchManagerMutation,
  useDeleteBranchManagerMutation,
} = branchManagerApi;
