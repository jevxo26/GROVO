import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface BranchBudgetData {
  id: string | number;
  [key: string]: any;
}

export interface BranchBudgetResponse {
  success: boolean;
  message: string;
  data: BranchBudgetData | BranchBudgetData[];
}

export const branchBudgetApi = createApi({
  reducerPath: "branchBudgetApi",
  baseQuery,
  tagTypes: ["BranchBudget"],
  endpoints: (builder) => ({
    getAllBranchBudgets: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/branch-budgets", params } : "/branch-budgets"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "BranchBudget" as const, id })),
              { type: "BranchBudget" as const, id: "LIST" },
            ]
          : [{ type: "BranchBudget" as const, id: "LIST" }],
    }),
    getBranchBudgetById: builder.query<any, string | number>({
      query: (id) => "/branch-budgets/${id}",
      providesTags: (result, error, id) => [{ type: "BranchBudget", id }],
    }),
    createBranchBudget: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/branch-budgets",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "BranchBudget", id: "LIST" }],
    }),
    updateBranchBudget: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/branch-budgets/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BranchBudget", id },
        { type: "BranchBudget", id: "LIST" },
      ],
    }),
    deleteBranchBudget: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/branch-budgets/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "BranchBudget", id },
        { type: "BranchBudget", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBranchBudgetsQuery,
  useGetBranchBudgetByIdQuery,
  useCreateBranchBudgetMutation,
  useUpdateBranchBudgetMutation,
  useDeleteBranchBudgetMutation,
} = branchBudgetApi;
