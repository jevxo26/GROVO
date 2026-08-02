import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface BranchExpenseData {
  id: string | number;
  [key: string]: any;
}

export interface BranchExpenseResponse {
  success: boolean;
  message: string;
  data: BranchExpenseData | BranchExpenseData[];
}

export const branchExpenseApi = createApi({
  reducerPath: "branchExpenseApi",
  baseQuery,
  tagTypes: ["BranchExpense"],
  endpoints: (builder) => ({
    getAllBranchExpenses: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/branch-expenses", params } : "/branch-expenses"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "BranchExpense" as const, id })),
              { type: "BranchExpense" as const, id: "LIST" },
            ]
          : [{ type: "BranchExpense" as const, id: "LIST" }],
    }),
    getBranchExpenseById: builder.query<any, string | number>({
      query: (id) => "/branch-expenses/${id}",
      providesTags: (result, error, id) => [{ type: "BranchExpense", id }],
    }),
    createBranchExpense: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/branch-expenses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "BranchExpense", id: "LIST" }],
    }),
    updateBranchExpense: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/branch-expenses/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BranchExpense", id },
        { type: "BranchExpense", id: "LIST" },
      ],
    }),
    deleteBranchExpense: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/branch-expenses/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "BranchExpense", id },
        { type: "BranchExpense", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBranchExpensesQuery,
  useGetBranchExpenseByIdQuery,
  useCreateBranchExpenseMutation,
  useUpdateBranchExpenseMutation,
  useDeleteBranchExpenseMutation,
} = branchExpenseApi;
