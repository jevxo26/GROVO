import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface FundData {
  id: string | number;
  [key: string]: any;
}

export interface FundResponse {
  success: boolean;
  message: string;
  data: FundData | FundData[];
}

export const fundApi = createApi({
  reducerPath: "fundApi",
  baseQuery,
  tagTypes: ["Fund"],
  endpoints: (builder) => ({
    getAllFunds: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/funds", params } : "/funds"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "Fund" as const, id })),
              { type: "Fund" as const, id: "LIST" },
            ]
          : [{ type: "Fund" as const, id: "LIST" }],
    }),
    getFundById: builder.query<any, string | number>({
      query: (id) => "/funds/${id}",
      providesTags: (result, error, id) => [{ type: "Fund", id }],
    }),
    createFund: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/funds",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Fund", id: "LIST" }],
    }),
    updateFund: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/funds/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Fund", id },
        { type: "Fund", id: "LIST" },
      ],
    }),
    deleteFund: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/funds/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Fund", id },
        { type: "Fund", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllFundsQuery,
  useGetFundByIdQuery,
  useCreateFundMutation,
  useUpdateFundMutation,
  useDeleteFundMutation,
} = fundApi;
