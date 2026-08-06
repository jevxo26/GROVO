import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface BranchFundData {
  id: string | number;
  [key: string]: any;
}

export interface BranchFundResponse {
  success: boolean;
  message: string;
  data: BranchFundData | BranchFundData[];
}

export const branchFundApi = createApi({
  reducerPath: "branchFundApi",
  baseQuery,
  tagTypes: ["BranchFund"],
  endpoints: (builder) => ({
    getAllBranchFunds: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/branch-funds", params } : "/branch-funds"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "BranchFund" as const, id })),
              { type: "BranchFund" as const, id: "LIST" },
            ]
          : [{ type: "BranchFund" as const, id: "LIST" }],
    }),
    getBranchFundById: builder.query<any, string | number>({
      query: (id) => "/branch-funds/${id}",
      providesTags: (result, error, id) => [{ type: "BranchFund", id }],
    }),
    createBranchFund: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/branch-funds",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "BranchFund", id: "LIST" }],
    }),
    updateBranchFund: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/branch-funds/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BranchFund", id },
        { type: "BranchFund", id: "LIST" },
      ],
    }),
    deleteBranchFund: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/branch-funds/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "BranchFund", id },
        { type: "BranchFund", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBranchFundsQuery,
  useGetBranchFundByIdQuery,
  useCreateBranchFundMutation,
  useUpdateBranchFundMutation,
  useDeleteBranchFundMutation,
} = branchFundApi;
