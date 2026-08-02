import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface BranchPerformanceData {
  id: string | number;
  [key: string]: any;
}

export interface BranchPerformanceResponse {
  success: boolean;
  message: string;
  data: BranchPerformanceData | BranchPerformanceData[];
}

export const branchPerformanceApi = createApi({
  reducerPath: "branchPerformanceApi",
  baseQuery,
  tagTypes: ["BranchPerformance"],
  endpoints: (builder) => ({
    getAllBranchPerformances: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/branch-performances", params } : "/branch-performances"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "BranchPerformance" as const, id })),
              { type: "BranchPerformance" as const, id: "LIST" },
            ]
          : [{ type: "BranchPerformance" as const, id: "LIST" }],
    }),
    getBranchPerformanceById: builder.query<any, string | number>({
      query: (id) => "/branch-performances/${id}",
      providesTags: (result, error, id) => [{ type: "BranchPerformance", id }],
    }),
    createBranchPerformance: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/branch-performances",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "BranchPerformance", id: "LIST" }],
    }),
    updateBranchPerformance: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/branch-performances/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BranchPerformance", id },
        { type: "BranchPerformance", id: "LIST" },
      ],
    }),
    deleteBranchPerformance: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/branch-performances/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "BranchPerformance", id },
        { type: "BranchPerformance", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBranchPerformancesQuery,
  useGetBranchPerformanceByIdQuery,
  useCreateBranchPerformanceMutation,
  useUpdateBranchPerformanceMutation,
  useDeleteBranchPerformanceMutation,
} = branchPerformanceApi;
