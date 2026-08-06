import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface FundAllocationHistoryData {
  id: string | number;
  [key: string]: any;
}

export interface FundAllocationHistoryResponse {
  success: boolean;
  message: string;
  data: FundAllocationHistoryData | FundAllocationHistoryData[];
}

export const fundAllocationHistoryApi = createApi({
  reducerPath: "fundAllocationHistoryApi",
  baseQuery,
  tagTypes: ["FundAllocationHistory"],
  endpoints: (builder) => ({
    getAllFundAllocationHistorys: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/fund-allocation-history", params } : "/fund-allocation-history"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "FundAllocationHistory" as const, id })),
              { type: "FundAllocationHistory" as const, id: "LIST" },
            ]
          : [{ type: "FundAllocationHistory" as const, id: "LIST" }],
    }),
    getFundAllocationHistoryById: builder.query<any, string | number>({
      query: (id) => "/fund-allocation-history/${id}",
      providesTags: (result, error, id) => [{ type: "FundAllocationHistory", id }],
    }),
    createFundAllocationHistory: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/fund-allocation-history",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "FundAllocationHistory", id: "LIST" }],
    }),
    updateFundAllocationHistory: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/fund-allocation-history/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "FundAllocationHistory", id },
        { type: "FundAllocationHistory", id: "LIST" },
      ],
    }),
    deleteFundAllocationHistory: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/fund-allocation-history/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "FundAllocationHistory", id },
        { type: "FundAllocationHistory", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllFundAllocationHistorysQuery,
  useGetFundAllocationHistoryByIdQuery,
  useCreateFundAllocationHistoryMutation,
  useUpdateFundAllocationHistoryMutation,
  useDeleteFundAllocationHistoryMutation,
} = fundAllocationHistoryApi;
