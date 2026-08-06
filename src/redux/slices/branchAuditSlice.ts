import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface BranchAuditData {
  id: string | number;
  [key: string]: any;
}

export interface BranchAuditResponse {
  success: boolean;
  message: string;
  data: BranchAuditData | BranchAuditData[];
}

export const branchAuditApi = createApi({
  reducerPath: "branchAuditApi",
  baseQuery,
  tagTypes: ["BranchAudit"],
  endpoints: (builder) => ({
    getAllBranchAudits: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/branch-audits", params } : "/branch-audits"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "BranchAudit" as const, id })),
              { type: "BranchAudit" as const, id: "LIST" },
            ]
          : [{ type: "BranchAudit" as const, id: "LIST" }],
    }),
    getBranchAuditById: builder.query<any, string | number>({
      query: (id) => "/branch-audits/${id}",
      providesTags: (result, error, id) => [{ type: "BranchAudit", id }],
    }),
    createBranchAudit: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/branch-audits",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "BranchAudit", id: "LIST" }],
    }),
    updateBranchAudit: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/branch-audits/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BranchAudit", id },
        { type: "BranchAudit", id: "LIST" },
      ],
    }),
    deleteBranchAudit: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/branch-audits/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "BranchAudit", id },
        { type: "BranchAudit", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBranchAuditsQuery,
  useGetBranchAuditByIdQuery,
  useCreateBranchAuditMutation,
  useUpdateBranchAuditMutation,
  useDeleteBranchAuditMutation,
} = branchAuditApi;
