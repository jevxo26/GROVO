import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface BranchCoverageData {
  id: string | number;
  [key: string]: any;
}

export interface BranchCoverageResponse {
  success: boolean;
  message: string;
  data: BranchCoverageData | BranchCoverageData[];
}

export const branchCoverageApi = createApi({
  reducerPath: "branchCoverageApi",
  baseQuery,
  tagTypes: ["BranchCoverage"],
  endpoints: (builder) => ({
    getAllBranchCoverages: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/branch-coverages", params } : "/branch-coverages"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "BranchCoverage" as const, id })),
              { type: "BranchCoverage" as const, id: "LIST" },
            ]
          : [{ type: "BranchCoverage" as const, id: "LIST" }],
    }),
    getBranchCoverageById: builder.query<any, string | number>({
      query: (id) => "/branch-coverages/${id}",
      providesTags: (result, error, id) => [{ type: "BranchCoverage", id }],
    }),
    createBranchCoverage: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/branch-coverages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "BranchCoverage", id: "LIST" }],
    }),
    updateBranchCoverage: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/branch-coverages/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BranchCoverage", id },
        { type: "BranchCoverage", id: "LIST" },
      ],
    }),
    deleteBranchCoverage: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/branch-coverages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "BranchCoverage", id },
        { type: "BranchCoverage", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBranchCoveragesQuery,
  useGetBranchCoverageByIdQuery,
  useCreateBranchCoverageMutation,
  useUpdateBranchCoverageMutation,
  useDeleteBranchCoverageMutation,
} = branchCoverageApi;
